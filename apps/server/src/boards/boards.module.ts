import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from 'src/aws/aws.module';
import { BoardsEntity } from './entities/board-entity';
import { UsersEntity } from 'src/users/entities/users-entity';
import { JwtModule } from '@nestjs/jwt';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';

@Module({
  controllers: [BoardsController, CommentController],
  providers: [BoardsService, UsersService, CommentService],
  imports: [
    JwtModule.register({
      secret: String(process.env.JWT_SECRET_KEY),
    }),
    TypeOrmModule.forFeature([UsersEntity, BoardsEntity]),
    AwsModule,
  ],
})
export class BoardsModule {}
