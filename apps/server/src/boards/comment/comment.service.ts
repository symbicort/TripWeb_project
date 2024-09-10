import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/users/entities/users-entity';
import { Repository } from 'typeorm';
import { BoardsEntity } from '../entities/board-entity';
import { CommentEntity } from '../entities/comment-entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentDB: Repository<CommentEntity>,
    @InjectRepository(BoardsEntity) private boardDB: Repository<BoardsEntity>,
    @InjectRepository(UsersEntity) private usersDB: Repository<UsersEntity>,
  ) {}

  // async createComment()
}
