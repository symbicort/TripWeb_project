import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { ConfigService } from '@nestjs/config';
import { BoardDto, resultBoardDto } from './dto/board.dto';
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

      let S3imgLink = '';

      console.log('게시글 업로드 요청', files, post);

      for (let i = 0; i < files.length; i++) {
        const imgUpload = await this.awsService.imageUploadToS3(files[i]);

        S3imgLink += imgUpload + ',';
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
  async getPost(@Param('id') id: number): Promise<boolean | BoardDto> {
    const postData = await this.boardService.getPost(id);

    console.log(postData);

    return postData;
  }

  @Get('/')
  async getAllPost(): Promise<void> {
    const post = await this.boardService.getAllPost();

    console.log(post);
  }

  @Delete(':id')
  @UseGuards(CookieGuard)
  async DeletePost(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const { nickname } = req.user as cookieInfoDto;

      const result = await this.boardService.deletePost(id, nickname);

      return result;
    } catch (err) {
      throw err;
    }
  }
}
