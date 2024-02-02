import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from './config/mysql.config';
import { BoardsEntity } from './boards/entities/board-entity';
import { UsersEntity } from './users/entities/users-entity';
import { CommentEntity } from './boards/entities/comment-entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    envFilePath: '.env',
  }), TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.RDS_MYSQL_HOST,
    port: Number(process.env.RDS_MYSQL_PORT),
    username: process.env.RDS_MYSQL_USERNAME,
    password: process.env.RDS_MYSQL_PW,
    database: process.env.RDS_MYSQL_NAME,
    entities: [UsersEntity, BoardsEntity, CommentEntity],
    synchronize: true
}),
  UserModule, BoardsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

console.log(__dirname);