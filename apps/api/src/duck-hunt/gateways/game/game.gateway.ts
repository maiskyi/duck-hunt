import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from '../../services/game';
import { DuckHitPayload } from '../../dto';
import { HitConfirmedPayload, HitRejectedPayload } from '../../services/game/game.types';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/game',
})
export class GameGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly game: GameService) {}

  afterInit() {
    this.game.bindEmitters({
      roundStart: (p) => this.server.emit('round:start', p),
      roundEnd: (p) => this.server.emit('round:end', p),
      hitConfirmed: (p) => this.server.emit('hit:confirmed', p),
      hitRejected: (p) => this.server.emit('hit:rejected', p),
    });

    // Start loop when gateway initializes.
    this.game.startAutoLoop();
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    // Optional: sync active round to late joiner
    this.game.onClientConnected();
    client.emit('server:ready', { ok: true, now: Date.now() });
  }

  @SubscribeMessage('duck:hit')
  onDuckHit(@MessageBody() body: DuckHitPayload) {
    const result = this.game.handleHit(body.roundId);

    // Return ack to the sender + broadcast via service emitters
    // Here: immediate response to the caller (socket.io "ack-like" return)
    if ((result as HitConfirmedPayload).hitAt) {
      const confirmed = result as HitConfirmedPayload;
      // broadcast already emitted via service? In our service, emitters are used only
      // in start/end. We'll emit hit here for simplicity.
      this.server.emit('hit:confirmed', confirmed);
      return confirmed;
    } else {
      const rejected = result as HitRejectedPayload;
      this.server.emit('hit:rejected', rejected);
      return rejected;
    }
  }
}
