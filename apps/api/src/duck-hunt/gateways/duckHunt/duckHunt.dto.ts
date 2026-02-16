import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { DuckHuntPathDirection, DuckHuntRoundEndReason } from '../../types';

import type {
  DuckHuntPathCoordinates,
  DuckHuntRound,
  DuckHuntRoundPath,
} from '../../types';

export class RoundMessagePathCoordinates implements DuckHuntPathCoordinates {
  @ApiProperty({
    type: Number,
  })
  public readonly x: number;

  @ApiProperty({
    type: Number,
  })
  public readonly y: number;
}

export class RoundMessagePath implements DuckHuntRoundPath {
  @ApiProperty({
    type: RoundMessagePathCoordinates,
  })
  public readonly start: DuckHuntPathCoordinates;

  @ApiProperty({
    type: RoundMessagePathCoordinates,
  })
  public readonly end: DuckHuntPathCoordinates;

  @ApiProperty({
    enum: DuckHuntPathDirection,
    enumName: 'DuckHuntPathDirection',
  })
  public readonly direction: DuckHuntPathDirection;

  @ApiProperty({
    type: Number,
  })
  public readonly speed: number;
}

export class RoundStartedEndedMessage implements DuckHuntRound {
  @ApiProperty({
    type: String,
  })
  public readonly roundId: string;

  @ApiProperty({
    type: Number,
  })
  public readonly startedAt: number;

  @ApiProperty({
    type: Number,
  })
  public readonly endsAt: number;

  @ApiProperty({
    type: Boolean,
  })
  public readonly ended: boolean;

  @ApiProperty({
    type: RoundMessagePath,
  })
  public readonly path: DuckHuntRoundPath;
}

export class GameStatsMessage {
  @ApiProperty({
    type: Number,
  })
  public readonly rounds: number;

  @ApiProperty({
    type: Number,
  })
  public readonly hits: number;
}

export class DuckHitPayload {
  @ApiProperty({
    description: 'The round ID',
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  public readonly roundId: string;
}

export class HitConfirmedRejectedMessage {
  @ApiProperty({
    type: String,
  })
  public readonly roundId: string;

  @ApiProperty({
    enum: DuckHuntRoundEndReason,
    enumName: 'DuckHuntRoundEndReason',
  })
  public readonly reason: DuckHuntRoundEndReason;
}
