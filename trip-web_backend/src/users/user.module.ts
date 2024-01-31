import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import * as typeorm from '@nestjs/typeorm';
import { UsersEntity } from './entities/users-entity';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService],
  controllers: [UsersController]
})
export class UserModule {}
