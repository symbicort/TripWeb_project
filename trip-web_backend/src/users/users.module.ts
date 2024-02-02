import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersEntity } from './entities/users-entity';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.register({
    secret: String(process.env.JWT_SECRET_KEY),
    signOptions: {
      expiresIn: 60*60
    }
  }),TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersService],
  controllers: [UsersController]
})



export class UserModule {}
