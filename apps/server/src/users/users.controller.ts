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
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto, loginDto, cookieInfoDto, userInfoDto } from './dto/user.dto';
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

  // @Patch('/info')
  // async editUserInfo(
  //   @Body() data: editUserInfo,
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   try {
  //     const logintoken = req.cookies.userKey;

  //     if (logintoken) {
  //       const result = await this.userService.updateUserInfo(logintoken, data);

  //       res.clearCookie('userKey');

  //       res.send(result);
  //     } else {
  //       res.send({ result: false, msg: '로그인 상태가 아닙니다' });
  //     }
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // @Delete('/withDraw')
  // async withDraw(@Req() req: Request, @Res() res: Response): Promise<void> {
  //   try {
  //     const logintoken = req.cookies.userKey;

  //     if (logintoken) {
  //       const result = await this.userService.withDraw(logintoken);

  //       if (result) {
  //         res.clearCookie('userKey');

  //         res.send({ result: true });
  //       } else {
  //         res.send({ result: false, msg: 'redis 내 키가 존재하지 않음' });
  //       }
  //     } else {
  //       res.send({ result: false, msg: '로그인 상태가 아닙니다' });
  //     }
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('image'))
  // async uploadImage(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   try {
  //     const logintoken = req.cookies.userKey;

  //     if (!logintoken) {
  //       res.send({ result: false, msg: '로그인 상태가 아닙니다' });
  //       return;
  //     }
  //     const imageUrl = await this.awsService.imageUploadToS3(file);

  //     await this.userService.uploadImg(logintoken, imageUrl);

  //     res.send({ result: true });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
