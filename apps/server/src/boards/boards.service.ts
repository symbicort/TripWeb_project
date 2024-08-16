import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsEntity } from './entities/board-entity';
import { Repository } from 'typeorm';
import { AwsService } from 'src/aws/aws.service';
import { BoardDto, createBoardDto } from './dto/board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardsEntity) private boardsDB: Repository<BoardsEntity>,
    private readonly awsService: AwsService,
  ) {}

  async createBoard(
    board: createBoardDto,
    imgUrl: string,
    writer: string,
  ): Promise<boolean> {
    try {
      const postData = {
        ...board,
        post_img: imgUrl,
        author: writer,
      };

      await this.boardsDB.insert(postData);

      return true;
    } catch (err) {
      return false;
    }
  }

  async getPost(id: number): Promise<boolean | BoardDto> {
    const postData: BoardDto = await this.boardsDB.findOne({
      where: { post_id: id },
    });

    if (!postData) {
      return false;
    }

    return postData;
  }

  // 수정 예정
  // async getAllPost(): Promise<BoardDto> {
  //   const postData = await this.boardsDB.find({
  //     select: ['post_id', 'title', 'content', 'updated_at'],
  //   });

  //   return post;
  // }

  // async deletePost(id: number): Promise<boolean> {
  //   const result = await this.boardsDB.softDelete({ post_id: id });

  //   console.log(result);
  // }
}
