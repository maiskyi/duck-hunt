import {
  ConnectedSocket,
  OnGatewayConnection,
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
  RoundStartedMessage,
} from './dto';
import { MessageBody } from '@nestjs/websockets';
import { DuckHuntService } from './services/duck-hunt';

export class DuckHuntGateway
  extends BaseGateway
  implements OnGatewayConnection
{
  @WebSocketServer()
  private server: Server;

  private logger = new Logger(DuckHuntGateway.name, {
    timestamp: true,
  });

  public constructor(private service: DuckHuntService) {
    super();
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
    @ConnectedSocket() client: Socket,
  ) {
    const { id: clientId } = client;
    this.logger.log(`Game started`, { timestamp, clientId });
    return this.roundStarted(client);
  }

  @AsyncApiSub({
    channel: DuckHuntTopic.RoundStarted,
    message: {
      payload: RoundStartedMessage,
    },
  })
  private roundStarted(client: Socket) {
    client.emit(DuckHuntTopic.RoundStarted, {
    //   roundId: body.roundId,
    //   by: client.id,
    //   at: Date.now(),
    });
    return { ok: true };
  }

  public handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
