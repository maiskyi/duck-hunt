import { Module } from '@nestjs/common';

// Gateways
import { DuckHuntInitGateway } from './gateways/duckHuntInit';
import { DuckHuntHitGateway } from './gateways/duckHuntHit';

// Services
import { DuckHuntGameService } from './services/duckHuntGame';

@Module({
  controllers: [],
  providers: [
    // Services
    DuckHuntGameService,
    // Gateways
    DuckHuntInitGateway,
    DuckHuntHitGateway,
  ],
})
export class DuckHuntModule {}
