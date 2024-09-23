import { HttpException, Injectable } from '@nestjs/common';
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

  async findOrCreateDMRoom(users: string[]) {
    try {
      const users_id: number[] = [];

      for (let i = 0; i < users.length; i++) {
        const user = await this.usersDB.findOne({
          where: { nickname: users[i] },
        });

        if (!user) {
          throw new HttpException(`${users[i]} 유저가 존재하지 않습니다.`, 404);
        }

        users_id.push(user.id);
      }

      const room = await this.chatRoomModel.find({
        users: { $all: users_id },
      });

      if (room) {
        return String(room[0]._id);
      }

      const newRoom = new this.chatRoomModel({
        users: users_id,
        room_type: 'DM',
      });

      const result = await newRoom.save();

      return String(result[0]._id);
    } catch (err) {
      throw err;
    }
  }
}
