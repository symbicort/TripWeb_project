import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.model';
import { ConfigService } from '@nestjs/config';

@Controller('boards')
export class BoardsController {
  constructor(
    private boardService: BoardsService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  // getAllBoard(): Board[]{
  //     console.log()
  //     // return this.boardService.getAllBoards();
  //     return this.boardService.getAllBoards();
  // }
  getAllBoard(): string {
    console.log(this.configService);
    // return this.boardService.getAllBoards();
    return this.configService.get('RDS_MYSQL_HOST');
  }

  @Post()
  createBoard(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.boardService.createBoard(title, description);
  }
}
