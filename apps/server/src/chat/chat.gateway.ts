import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
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
  async handleEvent(
    @MessageBody() data: chatRoomDto,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const { users } = data;

    const roomId = await this.chatService.findOrCreateDMRoom(users);

    client.join(roomId);
    this.server.to(roomId).emit('user_joined', '유저가 참가했습니다.');

    client.emit('room_id', { roomId });
  }
}
