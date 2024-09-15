import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsEntity } from './entities/board-entity';
import { Repository } from 'typeorm';
import { AwsService } from 'src/aws/aws.service';
import {
  BoardDto,
  createBoardDto,
  getAllPostDto,
  patchPostDto,
} from './dto/board.dto';
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
    const postData = await this.boardsDB.findOne({
      where: { id },
      order: { updated_at: 'ASC' },
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

    const comments = await this.commentsDB.find({
      where: { post: { id } },
      relations: ['author', 'parent'],
      order: { updated_at: 'ASC' },
      select: {
        id: true,
        content: true,
        created_at: true,
        comment_img: true,
        like: true,
        author: {
          nickname: true,
        },
        parent: {
          id: true,
        },
      },
    });

    const commentMap = new Map<number, CommentEntity>();
    const commentData: CommentEntity[] = [];

    comments.forEach((comment) => {
      comment.children = [];
      commentMap.set(comment.id, comment);
    });

    commentMap.forEach((comment) => {
      if (comment.parent) {
        const parentComment = commentMap.get(comment.parent.id);
        parentComment.children.push(comment);
      } else {
        commentData.push(comment); // 부모가 없는 경우 루트 댓글로 추가
      }
      console.log('데이터 추가되는 과정', commentData);
    });

    postData.comments = commentData;

    return postData;
  }

  async getAllPost(): Promise<getAllPostDto[]> {
    const postQuery =
      'SELECT boards.id, boards.title, boards.content, boards.like, boards.updated_at, Users.nickname FROM boards LEFT JOIN Users ON boards.authorId = Users.id;';

    const postData = await this.boardsDB.query(postQuery);

    return postData;
  }

  async deletePost(id: number, requestNickname: string): Promise<void> {
    const deleteQuery = `DELETE FROM boards WHERE id = ${id} AND authorId IN (SELECT id FROM Users WHERE nickname = '${requestNickname}')`;

    return this.boardsDB.query(deleteQuery);
  }

  async patchPost(
    post_id: number,
    nickname: string,
    patchData: patchPostDto,
  ): Promise<void> {
    try {
      const { title, content, post_img } = patchData;

      const postData = await this.boardsDB.findOne({
        where: { id: post_id },
        relations: ['author'],
        select: {
          author: {
            nickname: true,
          },
        },
      });

      const reqNickname: string = postData.author.nickname;

      if (reqNickname !== nickname) {
        throw new HttpException('게시글을 작성한 유저가 아닙니다.', 403);
      }

      this.boardsDB.update({ id: post_id }, { title, content, post_img });
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
