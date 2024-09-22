import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(4000, { cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  @SubscribeMessage('chat')
  handleEvent(@MessageBody() data: string): string {
    console.log(data);
    this.server.emit('response', { message: 'Event received', data });
    return data;
  }
}
