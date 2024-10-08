import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { BoardsModule } from './board/boards.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsEntity } from './board/entities/board-entity';
import { UsersEntity } from './users/entities/users-entity';
import { CommentEntity } from './board/entities/comment-entity';
import { AuthModule } from './auth/auth.module';
// import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AwsModule } from './aws/aws.module';
import { ColorChatModule } from './color-chat/color-chat.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.RDS_MYSQL_HOST,
      port: Number(process.env.RDS_MYSQL_PORT),
      username: process.env.RDS_MYSQL_USERNAME,
      password: process.env.RDS_MYSQL_PW,
      database: process.env.RDS_MYSQL_NAME,
      entities: [UsersEntity, BoardsEntity, CommentEntity],
      synchronize: true,
    }),
    UserModule,
    BoardsModule,
    AuthModule,
    AwsModule,
    ColorChatModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    ChatModule,
    MongooseModule.forRoot(String(process.env.MONGODB_URL)),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

console.log(__dirname);
