import { ApiProperty } from "@nestjs/swagger";

export class DuckShootPayload {
  @ApiProperty({
    type: String,
  })
  public id: string;

  @ApiProperty({
    type: Number,
  })
  public x: number;

  @ApiProperty({
    type: Number,
  })
  public y: number;

  @ApiProperty({
    type: Number,
  })
  public at: number;
}

export class DuckHitPayload {
  @ApiProperty({
    type: String,
  })
  public id: string;

  @ApiProperty({
    type: String,
  })
  public by: string;
}