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
  UseInterceptors,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { ConfigService } from '@nestjs/config';
import { BoardDto, resultBoardDto } from './dto/board.dto';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { AwsService } from 'src/aws/aws.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('boards')
export class BoardsController {
  constructor(
    private boardService: BoardsService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly awsService: AwsService,
  ) {}

  // @Post('/write')
  // @UseInterceptors(FilesInterceptor('images'))
  // async createBoard(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Body() post: BoardDto,
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     console.log('이미지 업로드 요청 get');
  //     let S3imgLink = '';

  //     console.log('게시글 업로드 요청', files, post);
  //     const loginUser = await this.checkUser(req);

  //     if (!loginUser.result) {
  //       res.status(401).send({ result: false, msg: '로그인 상태가 아닙니다.' });
  //       return;
  //     }
  //     for (let i = 0; i < files.length; i++) {
  //       const imgUpload = await this.awsService.imageUploadToS3(files[i]);

  //       S3imgLink += imgUpload + ',';
  //     }

  //     console.log('post_img 컬럼에 들어갈 값', S3imgLink);

  //     const createPost = await this.boardService.createBoard(
  //       req.body,
  //       S3imgLink,
  //       loginUser.nickname,
  //     );

  //     res.send(createPost);
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  @Get(':id')
  async getPost(@Param('id') id: number): Promise<boolean | BoardDto> {
    const postData = await this.boardService.getPost(id);

    return postData;
  }

  // 추가 예정 - 전체 게시물 조회
  // @Get('/')
  // async getAllPost(): Promise<BoardDto> {
  //   const post = await this.boardService.getAllPost();

  //   console.log(post);
  // }

  // @Delete(':id')
  // async DeletePost(
  //   @Param('id') id: number,
  //   @Req() req: Request,
  //   @Res() res: Response,
  //   @Body('author') author: string,
  // ): Promise<boolean> {
  //   try {
  //     const loginUser = await this.checkUser(req);

  //     if (!loginUser.result) {
  //       res.status(401).send({ result: false, msg: '로그인 상태가 아닙니다.' });
  //       return;
  //     }

  //     if (author !== loginUser.nickname) {
  //       res.status(401).send({ result: false, msg: '다른 유저의 글입니다.' });
  //       return;
  //     }

  //     const result = await this.boardService.deletePost(id);
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
