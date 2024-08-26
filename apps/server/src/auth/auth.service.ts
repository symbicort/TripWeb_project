import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { LoginDto } from 'src/users/dto/user.dto';
import { UsersEntity } from 'src/users/entities/users-entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async kakaoLogin(
    kakaoID: number,
    nickname: string,
    profile_img: string,
  ): Promise<LoginDto> {
    try {
      console.log('유저 정보', kakaoID, nickname, profile_img);

      const user = await this.userRepository.findOne({
        where: { kakaoID: kakaoID },
      });

      if (!user) {
        const userData = {
          kakaoID,
          nickname,
          profile_img,
        };

        this.userRepository.insert(userData);
      }

      const payload = { nickname };

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '2h',
        algorithm: 'RS256',
      });

      const refreshToken = this.jwtService.sign(
        {},
        {
          algorithm: 'RS256',
        },
      );

      this.userRepository.save({ refreshToken });

      return;
    } catch (error) {
      console.error(
        'Error fetching token:',
        error.response ? error.response.data : error.message,
      );
    }
  }
}
