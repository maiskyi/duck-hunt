import { Module } from '@nestjs/common';
import { DuckHitGateway } from './gateways/duckHit';
import { GameService } from './services/game';
import { DuckHuntGateway } from './duck-hunt.gateway';
import { DuckHuntService } from './duck-hunt.service';

@Module({
  controllers: [],
  providers: [GameService, DuckHuntGateway, DuckHuntService],
})
export class DuckHuntModule {}
