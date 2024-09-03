import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsEntity } from './entities/board-entity';
import { Repository } from 'typeorm';
import { AwsService } from 'src/aws/aws.service';
import { BoardDto, createBoardDto } from './dto/board.dto';
import { UsersEntity } from 'src/users/entities/users-entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardsEntity) private boardsDB: Repository<BoardsEntity>,
    @InjectRepository(UsersEntity) private usersDB: Repository<UsersEntity>,
    private readonly awsService: AwsService,
  ) {}

  async createBoard(
    board: createBoardDto,
    imgUrl: string,
    nickname: string,
  ): Promise<any> {
    try {
      const author: UsersEntity = await this.usersDB.findOne({
        where: { nickname },
      });

      const postData = {
        ...board,
        post_img: imgUrl,
        author,
      };

      await this.boardsDB.insert(postData);

      return true;
    } catch (err) {
      return false;
    }
  }

  async getPost(id: number): Promise<BoardDto> {
    const postQuery = `SELECT boards.*, Users.nickname FROM boards LEFT JOIN Users ON boards.authorId = Users.id where post_id = ${id};`;

    return await this.boardsDB.query(postQuery);
  }

  async getAllPost(): Promise<BoardDto[]> {
    const postQuery =
      'SELECT boards.*, Users.nickname FROM boards LEFT JOIN Users ON boards.authorId = Users.id;';

    return await this.boardsDB.query(postQuery);
  }

  async deletePost(id: number, requestNickname: string): Promise<void> {
    console.log(id, requestNickname);

    const deleteQuery = `DELETE FROM boards WHERE post_id = ${id} AND authorId IN (SELECT id FROM Users WHERE nickname = '${requestNickname}')`;

    await this.boardsDB.query(deleteQuery);
  }
}
