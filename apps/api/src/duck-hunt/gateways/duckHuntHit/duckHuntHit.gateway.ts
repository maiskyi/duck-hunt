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
} from '../../dto';
import { Logger } from '@nestjs/common';
import { DuckHuntGameService } from 'src/duck-hunt/services/duckHuntGame';
import type { HitConfirmedParams } from './duckHuntHit.types';

@WebSocketGateway({
  namespace: '/duck-hunt',
  cors: {
    origin: '*',
  },
})
export class DuckHuntHitGateway {
  @WebSocketServer()
  private server: Server;
  
  private logger = new Logger(DuckHuntHitGateway.name, {
    timestamp: true,
  });

  public constructor(private game: DuckHuntGameService) {}

  @SubscribeMessage(DuckHuntTopic.DuckHit)
  @AsyncApiPub({
    channel: DuckHuntTopic.DuckHit,
    message: {
      payload: DuckHitPayload,
    },
  })
  public onHit(
    @MessageBody() { roundId }: DuckHitPayload,
    @ConnectedSocket() { id: clientId }: Socket,
  ) {
    this.logger.log(DuckHuntTopic.DuckHit, {
      roundId,
      clientId,
    });
    this.game.hit({
      clientId,
      roundId,
    });
  }

  @AsyncApiSub({
    channel: DuckHuntTopic.HitConfirmed,
    message: {
      payload: HitConfirmedMessage,
    },
  })
  private hitConfirmed({ clientId }: HitConfirmedParams) {
    this.server.to(clientId).emit(DuckHuntTopic.HitConfirmed, {
      // roundId: body.roundId,
      // by: client.id,
      // at: Date.now(),
    });
  }
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
