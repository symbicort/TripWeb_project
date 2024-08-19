import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { UsersService } from 'src/users/users.service';
import { redisProvider } from 'src/users/redis.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from 'src/aws/aws.module';
import { BoardsEntity } from './entities/board-entity';
import { UsersEntity } from 'src/users/entities/users-entity';
import { TokenService } from 'src/users/token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, UsersService, redisProvider, TokenService],
  imports: [
    JwtModule.register({
      secret: String(process.env.JWT_SECRET_KEY),
    }),
    TypeOrmModule.forFeature([UsersEntity, BoardsEntity]),
    AwsModule,
  ],
})
export class BoardsModule {}
