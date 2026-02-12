import { ApiProperty } from '@nestjs/swagger';

export class HitConfirmedMessage {
  @ApiProperty({
    type: String,
  })
  public id: string;

  @ApiProperty({
    type: String,
  })
  public by: string;
}