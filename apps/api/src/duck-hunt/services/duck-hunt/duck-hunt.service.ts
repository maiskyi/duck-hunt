import { Injectable, Logger } from '@nestjs/common';
import { SessionState } from './duck-hunt.types';

@Injectable()
export class DuckHuntService {
  private sessions: Map<string, SessionState> = new Map();

  private logger = new Logger(DuckHuntService.name, {
    timestamp: true,
  });

  constructor() {}

  public;
}
