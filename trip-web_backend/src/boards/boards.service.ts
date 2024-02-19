import { Injectable } from '@nestjs/common';
import { Board, Boardstatus } from './boards.model';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsEntity } from './entities/board-entity';
import { Repository } from 'typeorm';
import { AwsService } from 'src/aws/aws.service';
import { createBoardDto } from './dto/board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardsEntity) private boardsDB: Repository<BoardsEntity>,
    private readonly awsService: AwsService,
  ) {}

  getAllBoards(): Board[] {
    return;
  }

  async createBoard(board: createBoardDto, imgUrl: string) {
    try {
      const createPost = await this.boardsDB.insert(board);

      console.log(createPost);
    } catch (err) {
      throw err;
    }
  }
}
