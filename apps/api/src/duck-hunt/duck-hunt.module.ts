import { Module } from '@nestjs/common';

import { GameService } from './services/game';
import { DuckHuntGateway } from './gateways/duck-hunt';
import { DuckHuntService } from './services/duck-hunt';

@Module({
  controllers: [],
  providers: [GameService, DuckHuntGateway, DuckHuntService],
})
export class DuckHuntModule {}
