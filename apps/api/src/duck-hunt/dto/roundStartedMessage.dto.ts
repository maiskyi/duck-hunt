import { ApiProperty } from '@nestjs/swagger';

export class RoundStartedMessage {
  @ApiProperty({
    type: String,
  })
  public roundId: string;
}
