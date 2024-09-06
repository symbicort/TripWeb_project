import { HttpException, Injectable } from '@nestjs/common';
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
    imgUrl: string[],
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

    const postData = await this.boardsDB.query(postQuery);

    const imgdata = postData[0].post_img.split(',');

    postData[0].post_img = imgdata;

    return postData;
  }

  async getAllPost(): Promise<BoardDto[]> {
    const postQuery =
      'SELECT boards.*, Users.nickname FROM boards LEFT JOIN Users ON boards.authorId = Users.id;';

    const postData = await this.boardsDB.query(postQuery);

    for (let i = 0; i < postData.length; i++) {
      const imgdata = postData[i].post_img.split(',');

      postData[i].post_img = imgdata;
    }

    return postData;
  }

  async deletePost(id: number, requestNickname: string): Promise<void> {
    console.log(id, requestNickname);

    const deleteQuery = `DELETE FROM boards WHERE post_id = ${id} AND authorId IN (SELECT id FROM Users WHERE nickname = '${requestNickname}')`;

    return this.boardsDB.query(deleteQuery);
  }

  async patchPost(
    postid: number,
    nickname: string,
    title: string,
    content: string,
    postImg: string[],
  ): Promise<void> {
    try {
      const postData = await this.getPost(postid);

      if (postData[0].nickname !== nickname) {
        throw new HttpException('게시글을 작성한 유저가 아닙니다.', 403);
      }

      await this.boardsDB.update(
        { post_id: postid },
        { title, content, post_img: postImg },
      );
    } catch (err) {
      throw err;
    }
  }

  async likePost(post_id: number, nickname: string) {
    try {
      const user = await this.usersDB.findOne({
        where: { nickname },
      });
      const board = await this.boardsDB.findOne({
        where: { post_id },
      });

      console.log(user, board);
    } catch (err) {
      throw err;
    }
  }
}
