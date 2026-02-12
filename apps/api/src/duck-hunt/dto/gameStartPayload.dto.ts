import { ApiProperty } from '@nestjs/swagger';

export class GameStartPayload {
  @ApiProperty({
    type: Number,
  })
  public timestamp: number;
}
