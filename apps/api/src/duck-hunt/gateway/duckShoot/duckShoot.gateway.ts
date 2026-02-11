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

import { DuckHitResponse, DuckShootRequest } from './duckShoot.dto';

export class DuckShootGateway extends BaseGateway {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage(DuckHuntEvent.DuckShoot)
  @AsyncApiPub({
    channel: DuckHuntEvent.DuckShoot,
    message: {
      payload: DuckShootRequest,
    },
  })
  public onShoot(
    @MessageBody() body: DuckShootRequest,
    @ConnectedSocket() client: Socket,
  ) {
    return this.onShotEmit(body, client);
  }

  @AsyncApiSub({
    channel: DuckHuntEvent.DuckHit,
    message: {
      payload: DuckHitResponse,
    },
  })
  private onShotEmit(body: DuckShootRequest, client: Socket) {
    this.server.emit(DuckHuntEvent.DuckHit, {
      id: body.id,
      by: client.id,
      at: Date.now(),
    });
  }
}
