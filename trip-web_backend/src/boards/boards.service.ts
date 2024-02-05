import { Injectable } from '@nestjs/common';
import { Board, Boardstatus } from './boards.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(title: string, description: string) {
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: Boardstatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }
}
