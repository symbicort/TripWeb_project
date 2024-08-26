import { Controller, Get, Header, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { KakaoAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao-login-page')
  @Header('Content-Type', 'text/html')
  async kakaoRedirect(@Res() res: Response): Promise<void> {
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`;
    res.redirect(url);
  }

  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  async getKakaoInfo(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user;

      console.log('유저 정보 나오나?', user);

      res.json(user);
    } catch (error) {
      throw new Error('Login failed');
    }
  }
}
