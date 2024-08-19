import { Controller, Get, Header, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

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
  async getKakaoInfo(@Req() req: Request) {
    const code = String(req.query.code);
    await this.authService.kakaoLogin(code);
  }
}
