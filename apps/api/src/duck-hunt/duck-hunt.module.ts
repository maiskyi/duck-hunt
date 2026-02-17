import { Module } from '@nestjs/common';

// Gateways
import { DuckHuntInitGateway } from './gateways/duckHunt';

// Services
import { DuckHuntService } from './services/duckHunt';

@Module({
  controllers: [],
  providers: [
    // Services
    DuckHuntService,
    // Gateways
    DuckHuntInitGateway,
  ],
})
export class DuckHuntModule {}
