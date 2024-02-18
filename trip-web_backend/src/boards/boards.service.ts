import { Injectable } from '@nestjs/common';
import { Board, Boardstatus } from './boards.model';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsEntity } from './entities/board-entity';
import { Repository } from 'typeorm';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardsEntity) private boardsDB: Repository<BoardsEntity>,
    private readonly awsService: AwsService,
  ) {}

  getAllBoards(): Board[] {
    return;
  }

  async createBoard(board: Object) {
    try {
      const createPost = await this.boardsDB.insert({});
    } catch (err) {
      throw err;
    }
  }
}
