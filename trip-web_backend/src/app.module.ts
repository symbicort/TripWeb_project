import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [UserModule, BoardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
