import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersEntity } from './entities/users-entity';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisModules } from 'redis';
import { redisProvider } from './redis.provider';
import { TokenService } from './token.service';


@Module({
  imports: [JwtModule.register({
    secret: String(process.env.JWT_SECRET_KEY),
  }),TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersService, redisProvider, TokenService],
  controllers: [UsersController]
})



export class UserModule {}

console.log('secret key check', process.env.JWT_SECRET_KEY)