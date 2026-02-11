import { Module } from '@nestjs/common';
import { DuckShootGateway } from './gateway/duckShoot';

@Module({
  controllers: [],
  providers: [DuckShootGateway],
})
export class DuckHuntModule {}
