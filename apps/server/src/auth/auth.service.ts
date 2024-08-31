import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { loginDto } from 'src/users/dto/user.dto';
import { UsersEntity } from 'src/users/entities/users-entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // ConfigService 주입
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET_KEY');
  }

  async kakaoLogin(
    kakaoID: number,
    nickname: string,
    profile_img: string,
  ): Promise<loginDto> {
    try {
      console.log('유저 정보', kakaoID, nickname, profile_img);

      let user = await this.userRepository.findOne({
        where: { kakaoID: kakaoID },
      });

      if (!user) {
        user = this.userRepository.create({
          kakaoID,
          nickname,
          profile_img,
        });

        await this.userRepository.save(user);
      }

      const payload = { nickname };

      const accessToken = this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: '2h',
        algorithm: 'HS256',
      });

      const refreshToken = this.jwtService.sign(
        { nickname },
        {
          secret: this.jwtSecret,
          algorithm: 'HS256',
        },
      );

      const returnNickname = user.nickname;

      await this.userRepository.update({ kakaoID }, { refreshToken });

      return { accessToken, refreshToken, returnNickname };
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      throw new Error('Login failed');
    }
  }
}
