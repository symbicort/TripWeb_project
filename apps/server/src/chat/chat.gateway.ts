import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { chatRoomDto } from './dto/chatroom.dto';

@WebSocketGateway(4000, { cors: { origin: '*' } })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  @SubscribeMessage('join_dm')
  async handleEvent(@MessageBody() data: chatRoomDto): Promise<any> {
    const { users } = data;

    const roomId = await this.chatService.findOrCreateDMRoom(users);

    console.log('방 아이디', roomId);
  }
}
