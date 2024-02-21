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

  async createBoard(board: createBoardDto, imgUrl: string) {
    try {
      const postData = {
        ...board,
        post_img: imgUrl,
      };

      console.log('게시글 업로드 데이터', postData);

      const createPost = await this.boardsDB.insert(postData);

      console.log(createPost);
    } catch (err) {
      throw err;
    }
  }
}
