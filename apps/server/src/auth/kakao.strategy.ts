import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthService } from './auth.service';
import { access } from 'fs';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.KAKAO_REST_API_KEY,
      callbackURL: process.env.KAKAO_REDIRECT_URI,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: CallableFunction) {
    const { nickname, profile_image } = profile._json.properties;

    const user = await this.authService.kakaoLogin(profile.id, nickname, profile_image);

    done(null);
  }
}
