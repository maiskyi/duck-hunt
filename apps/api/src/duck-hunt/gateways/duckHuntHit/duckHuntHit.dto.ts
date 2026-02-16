import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DuckHitPayload {
  @ApiProperty({
    description: 'The round ID',
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  public readonly roundId: string;

  @ApiProperty({
    description: 'The client ID',
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  public readonly by: string;

  @ApiProperty({
    description: 'The timestamp',
    example: 123,
  })
  @IsNumber()
  @IsNotEmpty()
  public readonly at: number;
}
