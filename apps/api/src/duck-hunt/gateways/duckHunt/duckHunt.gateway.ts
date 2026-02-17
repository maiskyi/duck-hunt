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

import { DuckHuntRoundEndReason, DuckHuntTopic } from '../../types';
import { DuckHuntService } from '../../services/duckHunt';

import {
  DuckHitPayload,
  GameStatsMessage,
  HitConfirmedRejectedMessage,
  RoundStartedEndedMessage,
  GameStartPayload,
} from './duckHunt.dto';

import type {
  GameStatsParams,
  HitConfirmedRejectedParams,
  OnRoundEndParams,
  OnRoundStartParams,
  RoundStartEndParams,
} from './duckHunt.types';

@WebSocketGateway({
  namespace: '/duck-hunt',
  cors: {
    origin: '*',
  },
})
export class DuckHuntInitGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;

  private logger = new Logger(DuckHuntInitGateway.name, {
    timestamp: true,
  });

  public constructor(private game: DuckHuntService) {
    this.game.bindHandlers({
      onRoundStart: this.onRoundStart.bind(this),
      onRoundEnd: this.onRoundEnd.bind(this),
    });
  }

  private onRoundStart({ round, clientId, rounds, hits }: OnRoundStartParams) {
    this.roundStart({
      round,
      clientId,
    });
    this.gameStats({
      clientId,
      rounds,
      hits,
    });
  }

  private onRoundEnd({ round, clientId, rounds, hits }: OnRoundEndParams) {
    this.roundEnd({
      round,
      clientId,
    });
    this.gameStats({
      clientId,
      rounds,
      hits,
    });
  }

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
    this.game.start({
      clientId,
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

  @AsyncApiSub({
    channel: DuckHuntTopic.GameStats,
    message: {
      payload: GameStatsMessage,
    },
  })
  private gameStats({ clientId, ...stats }: GameStatsParams) {
    this.server.to(clientId).emit(DuckHuntTopic.GameStats, stats);
  }

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
    const result = this.game.hit({
      clientId,
      roundId,
    });
    if (result.reason === DuckHuntRoundEndReason.Hit) {
      this.hitConfirmed({
        clientId,
        roundId,
        reason: result.reason,
      });
    } else {
      this.hitRejected({
        clientId,
        roundId,
        reason: result.reason,
      });
    }
    console.log('result', result);
  }

  @AsyncApiSub({
    channel: DuckHuntTopic.HitConfirmed,
    message: {
      payload: HitConfirmedRejectedMessage,
    },
  })
  private hitConfirmed({
    clientId,
    roundId,
    reason,
  }: HitConfirmedRejectedParams) {
    this.server.to(clientId).emit(DuckHuntTopic.HitConfirmed, {
      roundId,
      reason,
    });
    return { ok: true };
  }

  @AsyncApiSub({
    channel: DuckHuntTopic.HitRejected,
    message: {
      payload: HitConfirmedRejectedMessage,
    },
  })
  private hitRejected({
    clientId,
    roundId,
    reason,
  }: HitConfirmedRejectedParams) {
    this.server.to(clientId).emit(DuckHuntTopic.HitRejected, {
      roundId,
      reason,
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
