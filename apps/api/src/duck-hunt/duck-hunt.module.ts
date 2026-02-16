import { Module } from '@nestjs/common';

// Gateways
import { DuckHuntInitGateway } from './gateways/duckHunt';

// Services
import { DuckHuntGameService } from './services/duckHuntGame';

@Module({
  controllers: [],
  providers: [
    // Services
    DuckHuntGameService,
    // Gateways
    DuckHuntInitGateway,
  ],
})
export class DuckHuntModule {}
