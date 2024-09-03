import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { loginDto } from 'src/users/dto/user.dto';
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
  ): Promise<loginDto> {
    try {
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

      const accessToken = this.jwtService.sign(
        { nickname },
        {
          expiresIn: '2h',
          algorithm: 'HS256',
        },
      );

      const refreshToken = this.jwtService.sign(
        { kakaoID },
        {
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

  async generateAccessToken(clientToken: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { refreshToken: clientToken },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const accessToken = this.jwtService.sign(
      { nickname: user.nickname },
      {
        expiresIn: '2h',
        algorithm: 'HS256',
      },
    );

    return accessToken;
  }
}
