import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  namespace: '/duck-hunt',
  cors: {
    origin: '*',
  },
})
export class BaseGateway {}
