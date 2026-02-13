import { ApiProperty } from '@nestjs/swagger';

export class DuckHitPayload {
  @ApiProperty({
    type: String,
  })
  public roundId: string;

  @ApiProperty({
    type: Number,
  })
  public timestamp: number;
}
