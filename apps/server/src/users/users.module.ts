import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users-entity';
import { JwtModule } from '@nestjs/jwt';
// import { RedisModule } from '@liaoliaots/nestjs-redis';
import { redisProvider } from './redis.provider';
import { TokenService } from './token.service';
import { AwsModule } from 'src/aws/aws.module';
import { BoardsEntity } from 'src/boards/entities/board-entity';

@Module({
  imports: [
    JwtModule.register({
      secret: String(process.env.JWT_SECRET_KEY),
    }),
    TypeOrmModule.forFeature([UsersEntity, BoardsEntity]),
    AwsModule,
  ],
  providers: [UsersService, redisProvider, TokenService],
  controllers: [UsersController],
})
export class UserModule {}
