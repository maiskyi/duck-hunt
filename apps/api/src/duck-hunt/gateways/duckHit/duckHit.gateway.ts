import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { BaseGateway } from '../base';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DuckHuntTopic } from '../../types';
import { AsyncApiPub, AsyncApiSub } from 'nestjs-asyncapi';

import { DuckHitPayload, HitConfirmedMessage, HitRejectedMessage } from '../../dto';

export class DuckHitGateway extends BaseGateway {
  // @WebSocketServer()
  // private server: Server;

  // @SubscribeMessage(DuckHuntTopic.DuckHit)
  // @AsyncApiPub({
  //   channel: DuckHuntTopic.DuckHit,
  //   message: {
  //     payload: DuckHitPayload,
  //   },
  // })
  // public onShoot(
  //   @MessageBody() body: DuckHitPayload,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   return this.onHit(body, client);
  // }

  // @AsyncApiSub({
  //   channel: DuckHuntTopic.DuckHit,
  //   message: {
  //     payload: HitConfirmedMessage,
  //   },
  // })
  // private onHit(body: DuckHitPayload, client: Socket) {
  //   this.server.emit(DuckHuntTopic.DuckHit, {
  //     roundId: body.roundId,
  //     by: client.id,
  //     at: Date.now(),
  //   });
  // }

  // @AsyncApiSub({
  //   channel: DuckHuntTopic.HitConfirmed,
  //   message: {
  //     payload: HitConfirmedMessage,
  //   },
  // })
  // private onHitConfirmed(body: DuckHitPayload, client: Socket) {
  //   this.server.emit(DuckHuntTopic.DuckHit, {
  //     roundId: body.roundId,
  //     by: client.id,
  //     at: Date.now(),
  //   });
  // }

  // @AsyncApiSub({
  //   channel: DuckHuntTopic.HitRejected,
  //   message: {
  //     payload: HitRejectedMessage,
  //   },
  // })
  // private onHitRejected(body: DuckHitPayload, client: Socket) {
  //   this.server.emit(DuckHuntTopic.DuckHit, {
  //     roundId: body.roundId,
  //     by: client.id,
  //     at: Date.now(),
  //   });
  // }
}
