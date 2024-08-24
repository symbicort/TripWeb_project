import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { UsersEntity } from 'src/users/entities/users-entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity) private usersDB: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async kakaoLogin(
    kakaoID: number,
    nickname: string,
    profile_img: string,
  ): Promise<any> {
    try {
      console.log('유저 정보', kakaoID, nickname, profile_img);

      const existUser = await this.usersDB.count({
        where: { kakaoID: kakaoID },
      });

      if (existUser === 0) {
        const userData = {
          kakaoID,
          nickname,
          profile_img,
        };

        const result = await this.usersDB.insert(userData);
      }

      const payload = 

      const accessToken = this.jwtService.sign()

    } catch (error) {
      console.error(
        'Error fetching token:',
        error.response ? error.response.data : error.message,
      );
    }
  }
}
