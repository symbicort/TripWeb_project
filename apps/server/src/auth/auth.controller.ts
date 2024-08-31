import { Controller, Get, Header, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { KakaoAuthGuard } from './auth.guard';
import { loginDto } from 'src/users/dto/user.dto';

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
      const user = req.user as loginDto;

      console.log('유저 정보 나오나?', user.returnNickname);

      res.cookie('userinfo', user.refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 120,
      });
      res.status(200).json(user);
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('userinfo');
    res.status(200).send();
  }
}
