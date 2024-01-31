import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { BoardsModule } from './boards/boards.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from './config/mysql.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: 'config/.env',
  }), TypeOrmModule.forRoot(mysqlConfig),
  UserModule, BoardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
