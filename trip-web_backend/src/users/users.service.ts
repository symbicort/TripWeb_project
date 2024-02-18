import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UsersEntity } from './entities/users-entity';
import { hashPW, comparePW } from 'src/utils/crypto';
import {
  userDto,
  loginDto,
  ResultDto,
  jwtPayloadDto,
  userInfoDto,
  editUserInfo,
  authUserDto,
} from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { randomKey } from 'src/utils/makeKey';
import { RedisClient } from './redis.provider';
import { TokenService } from './token.service';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: RedisClient,
    @InjectRepository(UsersEntity) private usersDB: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly awsService: AwsService,
  ) {}

  async signUp(registerInfo: userDto): Promise<any> {
    const { user_id, email, nickname, created_at, profile_img } = registerInfo;

    const password = hashPW(registerInfo.password);

    try {
      await this.usersDB.insert({
        user_id,
        email,
        nickname,
        password,
        created_at,
        profile_img,
      });

      return { result: true, nickname: nickname };
    } catch (err) {
      console.error(err);
      if (err instanceof QueryFailedError) {
        const dupcol = err.message.split("'");
        return { result: false, dupcol: dupcol[1] };
      }
      throw err;
    }
  }

  async login(data: loginDto): Promise<ResultDto> {
    try {
      const { userId, pw } = data;

      const idValid = await this.usersDB.findOne({
        where: { user_id: userId },
      });

      if (!idValid) {
        return { result: false, msg: '가입된 아이디가 존재하지 않습니다.' };
      }

      const validPW: boolean = comparePW(pw, idValid.password);

      if (!validPW) {
        return { result: false, msg: '비밀번호가 일치하지 않습니다' };
      }

      const connectKey = randomKey();

      const payload: jwtPayloadDto = { loginkey: connectKey };

      const loginToken = this.jwtService.sign(payload);

      await this.redis.set(connectKey, idValid.user_id, 'EX', 604800);

      return { result: true, msg: '로그인 성공', token: loginToken };
    } catch (err) {
      throw err;
    }
  }

  async logout(logintoken: string): Promise<boolean> {
    try {
      const loginKey = this.jwtService.verify(logintoken).loginkey;

      const logoutRes = await this.redis.del(loginKey);

      if (logoutRes) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  async authUser(logintoken: string): Promise<authUserDto> {
    try {
      const userId = await this.tokenService.getUserIdFromToken(logintoken);

      if (!userId) {
        return { result: false };
      }

      const idValid = await this.usersDB.findOne({
        where: { user_id: userId },
      });

      if (!idValid) {
        return { result: false };
      }

      return { result: true, nickname: idValid.nickname };
    } catch (err) {
      throw err;
    }
  }

  async getUserInfo(logintoken: string): Promise<userInfoDto> {
    try {
      const userId = await this.tokenService.getUserIdFromToken(logintoken);

      const idValid = await this.usersDB.findOne({
        where: { user_id: userId },
      });

      return idValid;
    } catch (err) {
      throw err;
    }
  }

  async updateUserInfo(
    loginToken: string,
    data: editUserInfo,
  ): Promise<ResultDto> {
    const { userId, email, nickname, original_password } = data;

    console.log(data);

    try {
      const idValid = await this.usersDB.findOne({
        where: { user_id: userId },
      });

      if (!idValid) {
        return { result: false, msg: '이메일이 존재하지 않습니다.' };
      }

      const validPW: boolean = comparePW(original_password, idValid.password);

      if (!validPW) {
        return { result: false, msg: '비밀번호가 일치하지 않습니다' };
      }

      const nicknameValid = await this.usersDB.findOne({
        where: { nickname: nickname },
      });

      if (nicknameValid) {
        return {
          result: false,
          msg: '중복된 닉네임으로 변경이 불가능합니다.',
        };
      }

      if (data.new_password) {
        const password = hashPW(data.new_password);

        await this.usersDB.update(
          { user_id: userId },
          { email: email, nickname: nickname, password: password },
        );
      } else {
        await this.usersDB.update(
          { user_id: userId },
          { email: email, nickname: nickname, password: idValid.password },
        );
      }

      const loginKey = this.jwtService.verify(loginToken).loginkey;

      await this.redis.del(loginKey);

      return { result: true, msg: '정보가 성공적으로 변경되었습니다.' };
    } catch (err) {
      throw err;
    }
  }

  async withDraw(logintoken: string): Promise<ResultDto> {
    try {
      const loginKey = this.jwtService.verify(logintoken).loginkey;

      const userId = await this.redis.get(loginKey);

      const result = await this.usersDB.softDelete({ user_id: userId });

      if (result.affected) {
        await this.redis.del(loginKey);

        return { result: true, msg: '회원탈퇴가 완료되었습니다.' };
      }
    } catch (err) {
      throw err;
    }
  }

  async uploadImg(logintoken: string, imageUrl: string): Promise<void> {
    try {
      const userId = await this.tokenService.getUserIdFromToken(logintoken);

      const imgValid = await this.usersDB.findOne({
        where: { user_id: userId },
      });

      if (imgValid.profile_img) {
        console.log('이미지 삭제');
        await this.awsService.deleteImg(imgValid.profile_img);
      }

      const idValid = await this.usersDB.update(
        { user_id: userId },
        { profile_img: imageUrl },
      );

      console.log(idValid);
    } catch (err) {
      throw err;
    }
  }
}
