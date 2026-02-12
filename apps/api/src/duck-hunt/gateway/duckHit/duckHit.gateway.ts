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

import { DuckHitPayload, HitConfirmedMessage, HitRejectedMessage } from '../../dto';

export class DuckHitGateway extends BaseGateway {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage(DuckHuntEvent.DuckHit)
  @AsyncApiPub({
    channel: DuckHuntEvent.DuckHit,
    message: {
      payload: DuckHitPayload,
    },
  })
  public onShoot(
    @MessageBody() body: DuckHitPayload,
    @ConnectedSocket() client: Socket,
  ) {
    return this.onHit(body, client);
  }

  @AsyncApiSub({
    channel: DuckHuntEvent.DuckHit,
    message: {
      payload: HitConfirmedMessage,
    },
  })
  private onHit(body: DuckHitPayload, client: Socket) {
    this.server.emit(DuckHuntEvent.DuckHit, {
      id: body.id,
      by: client.id,
      at: Date.now(),
    });
  }

  @AsyncApiSub({
    channel: DuckHuntEvent.HitConfirmed,
    message: {
      payload: HitConfirmedMessage,
    },
  })
  private onHitConfirmed(body: DuckHitPayload, client: Socket) {
    this.server.emit(DuckHuntEvent.DuckHit, {
      id: body.id,
      by: client.id,
      at: Date.now(),
    });
  }

  @AsyncApiSub({
    channel: DuckHuntEvent.HitRejected,
    message: {
      payload: HitRejectedMessage,
    },
  })
  private onHitRejected(body: DuckHitPayload, client: Socket) {
    this.server.emit(DuckHuntEvent.DuckHit, {
      id: body.id,
      by: client.id,
      at: Date.now(),
    });
  }
}
