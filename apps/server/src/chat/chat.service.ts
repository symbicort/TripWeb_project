import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatRoom, ChatRoomDocument } from './schema/chatroom.schema';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users-entity';
import { Repository } from 'typeorm';
import { chatRoomDto } from './dto/chatroom.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatRoom.name)
    private readonly chatRoomModel: Model<ChatRoomDocument>,
    @InjectRepository(UsersEntity)
    private readonly usersDB: Repository<UsersEntity>,
  ) {}

  async createChatRoom(users: string[]) {
    const users_id: number[] = [];

    for (let i = 0; i < users.length; i++) {
      const user = await this.usersDB.findOne({
        where: { nickname: users[i] },
      });

      users_id.push(user.id);
    }

    const result = await this.chatRoomModel.find({ users: { $all: users_id } });

    console.log(result);
  }
}
