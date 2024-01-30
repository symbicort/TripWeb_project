import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { BoardsModule } from './boards/boards.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: 'config/.env',
  }), UserModule, BoardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
