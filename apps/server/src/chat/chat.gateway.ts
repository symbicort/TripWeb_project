import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(4000, { cors: { origin: '*' } })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  @SubscribeMessage('chat')
  handleEvent(@MessageBody() data): string {
    console.log('채팅 요청 데이터', data.chat);
    this.server.emit('response', {
      message: 'Event received',
      event: 'response',
      data,
    });
    return data;
  }
}
