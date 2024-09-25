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

  async getNicknameFromUserId(id: number): Promise<string> {
    try {
      const user = await this.usersDB.findOne({
        where: { id },
      });

      return user.nickname;
    } catch (err) {
      throw err;
    }
  }

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

  async getUserInfo(id: number): Promise<userInfoDto> {
    try {
      const userInfo = await this.usersDB.findOne({
        where: { id },
      });

      return new userInfoDto(userInfo);
    } catch (err) {
      throw err;
    }
  }

  async updateUserInfo(id: number, newNickname: string): Promise<any> {
    try {
      const result = await this.usersDB.update(
        { id },
        { nickname: newNickname, isDefault: false },
      );

      return result;
    } catch (err) {
      throw err;
    }
  }

  async withDraw(id: number): Promise<void> {
    try {
      await this.usersDB.softDelete({ id });
    } catch (err) {
      throw err;
    }
  }

  async uploadImg(user_id: number, imageUrl: string): Promise<void> {
    try {
      const user = await this.usersDB.findOne({
        where: { id: user_id },
      });

      if (!user.profile_img.includes('kakaocdn')) {
        console.log('기존 이미지 삭제');
        await this.awsService.deleteImg(user.profile_img);
      }

      await this.usersDB.update({ id: user_id }, { profile_img: imageUrl });
    } catch (err) {
      throw err;
    }
  }
}
