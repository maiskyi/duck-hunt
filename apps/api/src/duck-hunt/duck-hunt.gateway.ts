import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { BaseGateway } from './gateways/base';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { DuckHuntTopic } from './types';
import { AsyncApiPub, AsyncApiSub } from 'nestjs-asyncapi';

import {
  DuckHitPayload,
  GameStartPayload,
  HitConfirmedMessage,
  HitRejectedMessage,
} from './dto';
import { MessageBody } from '@nestjs/websockets';

export class DuckHuntGateway
  extends BaseGateway
  implements OnGatewayInit, OnGatewayConnection
{
  private logger = new Logger(DuckHuntGateway.name, {
    timestamp: true,
  });

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage(DuckHuntTopic.DuckHit)
  @AsyncApiPub({
    channel: DuckHuntTopic.DuckHit,
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

  @SubscribeMessage(DuckHuntTopic.GameStart)
  @AsyncApiPub({
    channel: DuckHuntTopic.GameStart,
    message: {
      payload: GameStartPayload,
    },
  })
  public onGameStart(
    @MessageBody() body: GameStartPayload,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('onGameStart', body);
  }

  @AsyncApiSub({
    channel: DuckHuntTopic.DuckHit,
    message: {
      payload: HitConfirmedMessage,
    },
  })
  private onHit(body: DuckHitPayload, client: Socket) {
    this.server.emit(DuckHuntTopic.DuckHit, {
      roundId: body.roundId,
      by: client.id,
      at: Date.now(),
    });
  }

  @AsyncApiSub({
    channel: DuckHuntTopic.HitConfirmed,
    message: {
      payload: HitConfirmedMessage,
    },
  })
  private onHitConfirmed(body: DuckHitPayload, client: Socket) {
    this.server.emit(DuckHuntTopic.DuckHit, {
      roundId: body.roundId,
      by: client.id,
      at: Date.now(),
    });
  }

  @AsyncApiSub({
    channel: DuckHuntTopic.HitRejected,
    message: {
      payload: HitRejectedMessage,
    },
  })
  private onHitRejected(body: DuckHitPayload, client: Socket) {
    this.server.emit(DuckHuntTopic.DuckHit, {
      roundId: body.roundId,
      by: client.id,
      at: Date.now(),
    });
  }

  public afterInit(server: Server) {
    console.log('DuckHuntGateway afterInit');
  }

  public handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
