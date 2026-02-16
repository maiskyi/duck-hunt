import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { AsyncApiPub, AsyncApiSub } from 'nestjs-asyncapi';

import { DuckHuntTopic } from '../../types';
import { GameStartPayload } from '../../dto';
import { DuckHuntService } from '../../services/duck-hunt';

import { RoundStartedEndedMessage } from './duck-hunt.dto';

import type { GameStatsParams,  RoundStartEndParams } from './duck-hunt.types';

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
      onRoundStart: ({ round, clientId }) => {
        this.roundStart({
          round,
          clientId,
        });
      },
      onRoundEnd: ({ round, clientId }) => {
        this.roundEnd({
          round,
          clientId,
        });
      },
    });
    return { ok: true };
  }

  @AsyncApiSub({
    channel: DuckHuntTopic.RoundStart,
    message: {
      payload: RoundStartedEndedMessage,
    },
  })
  private roundStart({ round, clientId }: RoundStartEndParams) {
    this.server.to(clientId).emit(DuckHuntTopic.RoundStart, round);
  }

  @AsyncApiSub({
    channel: DuckHuntTopic.RoundEnd,
    message: {
      payload: RoundStartedEndedMessage,
    },
  })
  private roundEnd({ round, clientId }: RoundStartEndParams) {
    this.server.to(clientId).emit(DuckHuntTopic.RoundEnd, round);
  }

  // @AsyncApiSub({
  //   channel: DuckHuntTopic.GameStats,
  //   message: {
  //     payload: RoundStartedMessage,
  //   },
  // })
  // private gameStats({ clientId, ...stats }: GameStatsParams) {
  //   this.server.to(clientId).emit(DuckHuntTopic.GameStats, stats);
  // }

  public handleConnection({ id: clientId }: Socket) {
    this.logger.log(`Client connected: ${clientId}`);
    this.game.createSession({ clientId });
  }

  public handleDisconnect({ id: clientId }: Socket) {
    this.logger.log(`Client disconnected: ${clientId}`);
    this.game.removeSession({ clientId });
  }
}
