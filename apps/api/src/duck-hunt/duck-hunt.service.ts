import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DuckHuntService {
  private logger = new Logger(DuckHuntService.name, {
    timestamp: true,
  });

  constructor() {}
}