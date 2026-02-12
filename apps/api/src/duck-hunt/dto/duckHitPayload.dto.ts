import { ApiProperty } from "@nestjs/swagger";

export class DuckHitPayload {
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