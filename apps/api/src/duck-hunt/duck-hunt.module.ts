import { Module } from '@nestjs/common';

import { GameService } from './services/game';
import { DuckHuntInitGateway } from './gateways/duckHuntInit';
import { DuckHuntGameService } from './services/duckHuntGame';

@Module({
  controllers: [],
  providers: [GameService, DuckHuntInitGateway, DuckHuntGameService],
})
export class DuckHuntModule {}
