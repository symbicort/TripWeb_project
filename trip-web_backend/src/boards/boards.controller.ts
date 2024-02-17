import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { ConfigService } from '@nestjs/config';
import { BoardDto } from './dto/board.dto';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { BoardsEntity } from './entities/board-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { authUserDto } from 'src/users/dto/user.dto';

@Controller('boards')
export class BoardsController {
  constructor(
    private boardService: BoardsService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    @InjectRepository(BoardsEntity) private boardsDB: Repository<BoardsEntity>,
  ) {}

  @Post('/write')
  async createBoard(
    @Body('title') post: BoardDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const loginUser = await this.checkUser(req);

      console.log('유저 정보확인', loginUser);

      // const writePost = await this.boardsDB.insert({});
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
