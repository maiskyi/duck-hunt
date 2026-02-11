import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { BaseGateway } from '../base.gateway';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DuckHuntEvent } from '../../types';
import { AsyncApiPub, AsyncApiSub } from 'nestjs-asyncapi';

import { DuckHitPayload, DuckShootPayload } from './duckShoot.dto';

export class DuckShootGateway extends BaseGateway {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage(DuckHuntEvent.DuckShoot)
  @AsyncApiPub({
    channel: DuckHuntEvent.DuckShoot,
    message: {
      payload: DuckShootPayload,
    },
  })
  public onShoot(
    @MessageBody() body: DuckShootPayload,
    @ConnectedSocket() client: Socket,
  ) {
    return this.onShotEmit(body, client);
  }

  @AsyncApiSub({
    channel: DuckHuntEvent.DuckHit,
    message: {
      payload: DuckHitPayload,
    },
  })
  private onShotEmit(body: DuckShootPayload, client: Socket) {
    this.server.emit(DuckHuntEvent.DuckHit, {
      id: body.id,
      by: client.id,
      at: Date.now(),
    });
  }
}
