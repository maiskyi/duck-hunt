import { Module } from '@nestjs/common';

import { DuckHuntModule } from './duck-hunt';

@Module({
  imports: [DuckHuntModule],
})
export class AppModule {}
