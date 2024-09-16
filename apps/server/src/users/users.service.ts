import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users-entity';
import { JwtService } from '@nestjs/jwt';
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

  async updateUserInfo(nickname: string, newNickname: string): Promise<any> {
    try {
      const result = await this.usersDB.update(
        { nickname },
        { nickname: newNickname, isDefault: false },
      );

      return result;
    } catch (err) {
      throw err;
    }
  }

  async withDraw(nickname: string): Promise<void> {
    try {
      await this.usersDB.softDelete({ nickname });
    } catch (err) {
      throw err;
    }
  }

  async uploadImg(nickname: string, imageUrl: string): Promise<void> {
    try {
      const user = await this.usersDB.findOne({
        where: { nickname },
      });

      if (!user.profile_img.includes('kakaocdn')) {
        console.log('기존 이미지 삭제');
        await this.awsService.deleteImg(user.profile_img);
      }

      await this.usersDB.update({ nickname }, { profile_img: imageUrl });
    } catch (err) {
      throw err;
    }
  }
}
