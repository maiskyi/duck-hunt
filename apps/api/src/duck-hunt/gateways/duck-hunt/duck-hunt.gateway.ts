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
} from '../../dto';
import { MessageBody } from '@nestjs/websockets';
import { DuckHuntService } from '../../services/duck-hunt';
import type { GameStatsParams, RoundStartParams } from './duck-hunt.types';
import { RoundStartedMessage } from './duck-hunt.dto';

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
    this.game.startRound({
      clientId,
      onStarted: ({ round, clientId }) => {
        this.roundStart({ round, clientId });
      },
    });
    return { ok: true };
  }

  @AsyncApiSub({
    channel: DuckHuntTopic.RoundStart,
    message: {
      payload: RoundStartedMessage,
    },
  })
  private roundStart({ round, clientId }: RoundStartParams) {
    this.server.to(clientId).emit(DuckHuntTopic.RoundStart, round);
  }

  @AsyncApiSub({
    channel: DuckHuntTopic.GameStats,
    message: {
      payload: RoundStartedMessage,
    },
  })
  private gameStats({ clientId, ...stats }: GameStatsParams) {
    this.server.to(clientId).emit(DuckHuntTopic.GameStats, stats);
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
