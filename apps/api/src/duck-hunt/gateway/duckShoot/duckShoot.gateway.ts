import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { BaseGateway } from '../base.gateway';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

export class DuckShootGateway extends BaseGateway {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('duck/shoot')
  onShoot(
    @MessageBody() body: { id: string; x: number; y: number; at: number },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('duck/hit', {
      id: body.id,
      by: client.id,
      at: Date.now(),
    });

    return { ok: true };
  }
}
