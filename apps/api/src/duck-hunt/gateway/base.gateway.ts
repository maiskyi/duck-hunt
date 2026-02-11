import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  namespace: 'duck-hunt',
  transports: ['websocket'],
})
export class BaseGateway {}
