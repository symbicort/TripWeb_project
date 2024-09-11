import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsEntity } from './entities/board-entity';
import { Repository } from 'typeorm';
import { AwsService } from 'src/aws/aws.service';
import { BoardDto, createBoardDto, getAllPostDto } from './dto/board.dto';
import { UsersEntity } from 'src/users/entities/users-entity';
import { CommentEntity } from './entities/comment-entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardsEntity) private boardsDB: Repository<BoardsEntity>,
    @InjectRepository(UsersEntity) private usersDB: Repository<UsersEntity>,
    @InjectRepository(CommentEntity)
    private commentsDB: Repository<CommentEntity>,
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

  async getPost(id: number) {
    const postData = this.boardsDB.findOne({
      where: { id },
      relations: ['author'],
      select: {
        id: true,
        title: true,
        content: true,
        updated_at: true,
        post_img: true,
        like: true,
        author: {
          nickname: true,
        },
      },
    });

    // 댓글 포함 select 로직 추가 필요
    console.log(commentData);

    return postData;
  }

  async getAllPost(): Promise<getAllPostDto[]> {
    const postQuery =
      'SELECT boards.id, boards.title, boards.content, boards.like, Users.nickname FROM boards LEFT JOIN Users ON boards.authorId = Users.id;';

    const postData = await this.boardsDB.query(postQuery);

    return postData;
  }

  async deletePost(id: number, requestNickname: string): Promise<void> {
    const deleteQuery = `DELETE FROM boards WHERE id = ${id} AND authorId IN (SELECT id FROM Users WHERE nickname = '${requestNickname}')`;

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
        { id: postid },
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
        relations: ['likedBoards'],
      });
      const board = await this.boardsDB.findOne({
        where: { id: post_id },
      });

      user.likedBoards.push(board);
      user.save();

      board.like += 1;
      board.save();

      return true;
    } catch (err) {
      throw err;
    }
  }

  async cancelLikePost(post_id: number, nickname: string) {
    try {
      const user = await this.usersDB.findOne({
        where: { nickname },
        relations: ['likedBoards'],
      });
      const board = await this.boardsDB.findOne({
        where: { id: post_id },
      });

      user.likedBoards.filter(
        (likeboards) => likeboards.id !== Number(post_id),
      );

      user.save();

      board.like -= 1;
      board.save();

      return true;
    } catch (err) {
      throw err;
    }
  }

  async checkUserLikedPost(post_id: number, nickname: string) {
    try {
      const exists = await this.usersDB
        .createQueryBuilder('user')
        .innerJoin('user.likedBoards', 'likedBoard')
        .where('user.nickname = :nickname', { nickname })
        .andWhere('likedBoard.post_id = :postId', { postId: post_id })
        .getOne();

      return !!exists;
    } catch (err) {
      throw err;
    }
  }
}
