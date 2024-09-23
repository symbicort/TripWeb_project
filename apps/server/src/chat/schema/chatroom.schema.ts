import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

@Schema({ collection: 'chatrooms' })
export class ChatRoom {
  @Prop()
  name: string;

  @Prop()
  users: number[];

  @Prop()
  room_type: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
