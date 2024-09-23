import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users-entity';
import { ChatRoom, ChatRoomSchema } from './schema/chatroom.schema';

@Module({
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
  imports: [
    MongooseModule.forFeature([
      { name: ChatRoom.name, schema: ChatRoomSchema },
    ]),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
})
export class ChatModule {}
