import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UsersEntity } from './entities/users-entity';
import { hashPW, comparePW } from 'src/utils/crypto';
import { JwtService } from '@nestjs/jwt';
import { RedisClient } from './redis.provider';
import { AwsService } from 'src/aws/aws.service';
import { userInfoDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private usersDB: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
    private readonly awsService: AwsService,
  ) {}

  async checkDupNickname(inputNickname: string): Promise<boolean> {
    try {
      const result = await this.usersDB.count({
        where: { nickname: inputNickname },
      });

      // DB 내에 있으면 false, 없으면 true
      if (result > 0) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      throw err;
    }
  }

  async getUserInfo(nickname: string): Promise<userInfoDto> {
    try {
      const userInfo = await this.usersDB.findOne({
        where: { nickname },
      });

      return new userInfoDto(userInfo);
    } catch (err) {
      throw err;
    }
  }

  async updateUserInfo(data: editUserInfo): Promise<ResultDto> {
    const { userId, email, nickname, original_password } = data;

    console.log(data);

    try {
      const nicknameValid = await this.usersDB.findOne({
        where: { nickname: nickname },
      });

      if (nicknameValid) {
        return {
          result: false,
          msg: '중복된 닉네임으로 변경이 불가능합니다.',
        };
      }

      await this.usersDB.update(
        { user_id: userId },
        { email: email, nickname: nickname, password: password },
      );

      return { result: true, msg: '정보가 성공적으로 변경되었습니다.' };
    } catch (err) {
      throw err;
    }
  }

  // async withDraw(logintoken: string): Promise<ResultDto> {
  //   try {
  //     const loginKey = this.jwtService.verify(logintoken).loginkey;

  //     const userId = await this.redis.get(loginKey);

  //     const result = await this.usersDB.softDelete({ user_id: userId });

  //     if (result.affected) {
  //       await this.redis.del(loginKey);

  //       return { result: true, msg: '회원탈퇴가 완료되었습니다.' };
  //     }
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async uploadImg(logintoken: string, imageUrl: string): Promise<void> {
  //   try {
  //     const userId = await this.tokenService.getUserIdFromToken(logintoken);

  //     const imgValid = await this.usersDB.findOne({
  //       where: { user_id: userId },
  //     });

  //     if (imgValid.profile_img) {
  //       console.log('이미지 삭제');
  //       await this.awsService.deleteImg(imgValid.profile_img);
  //     }

  //     const idValid = await this.usersDB.update(
  //       { user_id: userId },
  //       { profile_img: imageUrl },
  //     );

  //     console.log(idValid);
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
