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
  async joinRoomforDm(
    @MessageBody() data: chatRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { users } = data;

    const roomId = await this.chatService.findOrCreateDMRoom(users);

    client.join(roomId);
    this.server.to(roomId).emit('user_joined', '유저가 참가했습니다.');

    console.log(roomId);
    client.emit('room_id', { roomId });
  }

  @SubscribeMessage('send_chat')
  async sendChat(
    @MessageBody() data: chatRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(client.rooms);
  }
}
