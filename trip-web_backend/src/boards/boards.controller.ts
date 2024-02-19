import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { ConfigService } from '@nestjs/config';
import { BoardDto } from './dto/board.dto';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { BoardsEntity } from './entities/board-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { authUserDto } from 'src/users/dto/user.dto';
import { AwsService } from 'src/aws/aws.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('boards')
export class BoardsController {
  constructor(
    private boardService: BoardsService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly awsService: AwsService,
    @InjectRepository(BoardsEntity) private boardsDB: Repository<BoardsEntity>,
  ) {}

  @Post('/write')
  @UseInterceptors(FilesInterceptor('images'))
  async createBoard(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() post: BoardDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      console.log('이미지 업로드 요청 get');
      let S3imgLink;

      console.log('게시글 업로드 요청', files, post);
      const loginUser = await this.checkUser(req);

      console.log('유저 정보확인', loginUser);
      console.log('글 작성 데이터 확인', post);

      for (let i = 0; i < files.length; i++) {
        const imgUpload = await this.awsService.imageUploadToS3(files[i]);

        S3imgLink += imgUpload + ',';
      }

      console.log('post_img 컬럼에 들어갈 값', S3imgLink);

      // const createPost = await this.boardService.createBoard(req.body);
    } catch (err) {
      throw err;
    }
  }

  async checkUser(req: Request): Promise<boolean | authUserDto> {
    const loginToken = req.cookies.userKey;

    if (!loginToken) {
      return false;
    }

    const authLogin = await this.usersService.authUser(loginToken);

    if (!authLogin) {
      return false;
    }

    return authLogin;
  }
}
