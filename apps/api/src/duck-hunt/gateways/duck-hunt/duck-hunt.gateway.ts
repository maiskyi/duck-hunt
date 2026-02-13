import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BaseGateway } from '../base';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { DuckHuntTopic } from '../../types';
import { AsyncApiPub, AsyncApiSub } from 'nestjs-asyncapi';

import {
  DuckHitPayload,
  GameStartPayload,
  HitConfirmedMessage,
  HitRejectedMessage,
  RoundStartedMessage,
} from '../../dto';
import { MessageBody } from '@nestjs/websockets';
import { DuckHuntService } from '../../services/duck-hunt';
import type { RoundStartParams } from './duck-hunt.types';

@WebSocketGateway({
  namespace: '/duck-hunt',
  cors: {
    origin: '*',
  },
})
export class DuckHuntGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;

  private logger = new Logger(DuckHuntGateway.name, {
    timestamp: true,
  });

  public constructor(private game: DuckHuntService) {}

  @SubscribeMessage(DuckHuntTopic.GameStart)
  @AsyncApiPub({
    channel: DuckHuntTopic.GameStart,
    message: {
      payload: GameStartPayload,
    },
  })
  public onGameStart(
    @MessageBody() { timestamp }: GameStartPayload,
    @ConnectedSocket() { id: clientId }: Socket,
  ) {
    this.logger.log(DuckHuntTopic.GameStart, {
      timestamp,
      clientId,
    });
    return this.roundStart({ clientId });
  }

  @AsyncApiSub({
    channel: DuckHuntTopic.RoundStart,
    message: {
      payload: RoundStartedMessage,
    },
  })
  private roundStart({ clientId }: RoundStartParams) {
    this.game.startRound({ clientId });
    this.server.to(clientId).emit(DuckHuntTopic.RoundStart, {
      //   roundId: body.roundId,
      //   by: client.id,
      //   at: Date.now(),
    });
    return { ok: true };
  }

  public handleConnection({ id: clientId }: Socket) {
    this.logger.log(`Client connected: ${clientId}`);
    this.game.createSession({ clientId });
  }

  public handleDisconnect({ id: clientId }: Socket) {
    this.logger.log(`Client disconnected: ${clientId}`);
    this.game.removeSession({ clientId });
  }
}
