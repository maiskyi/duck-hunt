import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
// import { BaseGateway } from '../base';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AsyncApiPub, AsyncApiSub } from 'nestjs-asyncapi';

import { DuckHuntTopic } from '../../types';
import {
  DuckHitPayload,
  HitConfirmedMessage,
  HitRejectedMessage,
} from '../../dto';

@WebSocketGateway({
  namespace: '/duck-hunt',
  cors: {
    origin: '*',
  },
})
export class DuckHuntHitGateway {
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
