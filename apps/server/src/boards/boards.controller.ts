import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { ConfigService } from '@nestjs/config';
import { BoardDto, getAllPostDto, patchPostDto } from './dto/board.dto';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { AwsService } from 'src/aws/aws.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CookieGuard } from 'src/auth/cookie.guard';
import { cookieInfoDto } from 'src/users/dto/user.dto';

@Controller('boards')
export class BoardsController {
  constructor(
    private boardService: BoardsService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly awsService: AwsService,
  ) {}

  @Post('/write')
  @UseGuards(CookieGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async createBoard(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() post: BoardDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { nickname } = req.user as cookieInfoDto;

      const S3imgLink: string[] = [];

      console.log('게시글 업로드 요청', files, post);

      for (let i = 0; i < files.length; i++) {
        const imgUpload: string = await this.awsService.imageUploadToS3(
          files[i],
        );

        S3imgLink.push(imgUpload);
      }

      console.log('post_img 컬럼에 들어갈 값', S3imgLink);

      const createPost = await this.boardService.createBoard(
        req.body,
        S3imgLink,
        nickname,
      );

      res.send(createPost);
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    return this.boardService.getPost(id);
  }

  @Get('/')
  async getAllPost(): Promise<getAllPostDto[]> {
    return await this.boardService.getAllPost();
  }

  @Delete(':id')
  @UseGuards(CookieGuard)
  async DeletePost(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { nickname } = req.user as cookieInfoDto;

      await this.boardService.deletePost(id, nickname);

      return res.status(200).send();
    } catch (err) {
      throw err;
    }
  }

  @Patch(':id')
  @UseGuards(CookieGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async PatchPost(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: patchPostDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    try {
      const { nickname } = req.user as cookieInfoDto;

      const { title, content } = body;

      const postImg = [];

      for (let i = 0; i < files.length; i++) {
        const imgUpload: string = await this.awsService.imageUploadToS3(
          files[i],
        );

        postImg.push(imgUpload);
      }

      await this.boardService.patchPost(id, nickname, title, content, postImg);

      return res.status(200).send();
    } catch (err) {
      throw err;
    }
  }

  @Post(':id/like')
  @UseGuards(CookieGuard)
  async likePost(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    try {
      const { nickname } = req.user as cookieInfoDto;

      await this.boardService.likePost(id, nickname);

      return res.status(200).send();
    } catch (err) {
      throw err;
    }
  }

  @Post(':id/like/cancel')
  @UseGuards(CookieGuard)
  async likeCancelPost(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    try {
      const { nickname } = req.user as cookieInfoDto;

      await this.boardService.cancelLikePost(id, nickname);

      return res.status(200).send();
    } catch (err) {
      throw err;
    }
  }

  @Post(':id/like/check')
  @UseGuards(CookieGuard)
  async checkUserLikedPost(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    try {
      const { nickname } = req.user as cookieInfoDto;

      const result = await this.boardService.checkUserLikedPost(id, nickname);

      return res.status(200).send(result);
    } catch (err) {
      throw err;
    }
  }
}
