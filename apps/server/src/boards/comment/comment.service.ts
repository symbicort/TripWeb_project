import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersEntity } from 'src/users/entities/users-entity';
import { Repository } from 'typeorm';
import { BoardsEntity } from '../entities/board-entity';
import { CommentEntity } from '../entities/comment-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createcommentDto, patchCommentDto } from '../dto/comment.dto';
import { numBytes } from 'aws-sdk/clients/finspace';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentDB: Repository<CommentEntity>,
    @InjectRepository(BoardsEntity) private boardDB: Repository<BoardsEntity>,
    @InjectRepository(UsersEntity) private usersDB: Repository<UsersEntity>,
  ) {}

  async createComment(data: createcommentDto, user_id: number) {
    try {
      const author = await this.usersDB.findOne({
        where: { id: user_id },
      });

      const post = await this.boardDB.findOne({
        where: { id: data.post_id },
      });

      if (post == null) {
        throw new NotFoundException('post is notFound');
      }

      let parentboard;

      if (data.parentsId) {
        parentboard = await this.commentDB.findOne({
          where: { id: data.parentsId },
        });
      }

      const commentData = {
        content: data.content,
        comment_img: data.image,
        parent: parentboard,
        author,
        post,
      };

      await this.commentDB.insert(commentData);
    } catch (err) {
      throw err;
    }
  }

  async deleteComment(id: number, user_id: number) {
    try {
      const commentData = await this.commentDB.findOne({
        where: { id },
        relations: ['author'],
        select: {
          author: {
            nickname: true,
          },
        },
      });

      if (commentData.author.id !== user_id) {
        throw new HttpException('댓글을 작성한 유저가 아닙니다.', 403);
      }

      await this.commentDB.softDelete({ id });
    } catch (err) {
      throw err;
    }
  }

  async patchComment(id: number, user_id: number, patchData: patchCommentDto) {}
}
