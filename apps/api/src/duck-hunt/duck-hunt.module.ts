import { Module } from '@nestjs/common';
import { DuckHitGateway } from './gateway/duckHit';
import { GameService } from './services/game';

@Module({
  controllers: [],
  providers: [DuckHitGateway, GameService],
})
export class DuckHuntModule {}
