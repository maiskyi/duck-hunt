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
}
