import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

@Schema()
export class ChatRoom {
  @Prop()
  name: string;

  @Prop()
  users: number[];

  @Prop({ default: Date.now })
  created_at: Date;
}

export const CatSchema = SchemaFactory.createForClass(ChatRoom);
