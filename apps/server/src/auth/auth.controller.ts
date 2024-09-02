import {
  Controller,
  Get,
  Header,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { KakaoAuthGuard } from './auth.guard';
import { loginDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @Header('Content-Type', 'text/html')
  async kakaoRedirect(@Res() res: Response): Promise<void> {
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`;
    res.redirect(url);
  }

  @Get('kakao-redirect')
  @UseGuards(KakaoAuthGuard)
  async getKakaoInfo(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as loginDto;

      res.cookie('userinfo', user.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 120,
      });
      res.status(200).json({
        refreshToken: user.refreshToken,
        nickname: user.returnNickname,
      });
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('userinfo');
    res.status(200).send();
  }

  @Post('token')
  async authToken(@Req() req: Request, @Res() res: Response) {
    try {
      const clientToken = req.body.refreshToken;

      const newAccessToken =
        await this.authService.generateAccessToken(clientToken);

      res.cookie('userinfo', newAccessToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 120,
      });
      return res.status(200).json({ message: 'new access token generated' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).json({ message: error.message });
      }
    }
  }
}
