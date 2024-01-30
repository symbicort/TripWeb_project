import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.model';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService){}

    @Get()
    getAllBoard(): Board[]{
        return this.boardService.getAllBoards();
    }

    @Post()
    createBoard(
        @Body('title') title: string, 
        @Body('description') description: string){
            return this.boardService.createBoard(title, description);
        }

}