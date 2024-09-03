import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { cookieInfoDto } from './dto/user.dto';
import { Response, Request } from 'express';
import { AwsService } from 'src/aws/aws.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CookieGuard } from 'src/auth/cookie.guard';

@Controller('user')
export class UsersController {
  constructor(
    private userService: UsersService,
    private readonly awsService: AwsService,
  ) {}

  @Get('/checkDupNick')
  async checkDupNick(@Req() req: Request): Promise<boolean> {
    try {
      const inputNickname: string = req.query.nickname as string;

      if (!inputNickname) {
        return false;
      }

      const result = await this.userService.checkDupNickname(inputNickname);

      return result;
    } catch (err) {
      throw err;
    }
  }

  @Get('/authuser')
  @UseGuards(CookieGuard)
  async authuser(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as cookieInfoDto;

      return res.status(200).json({ nickname: user.nickname });
    } catch (err) {
      throw err;
    }
  }

  @Post('/info')
  @UseGuards(CookieGuard)
  async getUserInfo(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as cookieInfoDto;

      const userInfo = await this.userService.getUserInfo(user.nickname);

      return res.status(200).send(userInfo);
    } catch (err) {
      throw err;
    }
  }

  @Patch('/info')
  @UseGuards(CookieGuard)
  async editUserInfo(
    @Body() body,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const { nickname } = req.user as cookieInfoDto;
      const newNickname = body.nickname;

      await this.userService.updateUserInfo(nickname, newNickname);

      res.clearCookie('userinfo');

      res.status(200).send();
    } catch (err) {
      throw err;
    }
  }

  @Delete('/withDraw')
  @UseGuards(CookieGuard)
  async withDraw(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const { nickname } = req.user as cookieInfoDto;

      res.clearCookie('userinfo');

      await this.userService.withDraw(nickname);

      res.status(200).send();
    } catch (err) {
      throw err;
    }
  }

  @Post('upload')
  @UseGuards(CookieGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const { nickname } = req.user as cookieInfoDto;

      const imageUrl = await this.awsService.imageUploadToS3(file);

      await this.userService.uploadImg(nickname, imageUrl);

      res.send({ result: true });
    } catch (error) {
      throw error;
    }
  }
}
