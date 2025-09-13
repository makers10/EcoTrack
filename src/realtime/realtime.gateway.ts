import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' }, // tighten in prod
  namespace: '/realtime', // optional, keeps it scoped
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    // e.g., read token: const { token } = client.handshake.auth;
    console.log('WS connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('WS disconnected:', client.id);
  }

  // simple echo test
  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    client.emit('pong', { ok: true, received: data ?? null });
  }

  // join personal room
  @SubscribeMessage('joinUserRoom')
  joinUserRoom(@ConnectedSocket() client: Socket, @MessageBody() userId: string) {
    client.join(`user_${userId}`);
    client.emit('joined', `user_${userId}`);
  }

  // helper for your services: push to a user
  notifyUser(userId: string, payload: any) {
    this.server.to(`user_${userId}`).emit('notify', payload);
  }
}
