import { ApiProperty } from '@nestjs/swagger';

export class HitRejectedMessage {
  @ApiProperty({
    type: String,
  })
  public id: string;

  @ApiProperty({
    type: String,
  })
  public by: string;
}
