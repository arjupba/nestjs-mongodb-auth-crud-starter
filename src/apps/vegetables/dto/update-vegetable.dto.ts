import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateVegetableDto {
  @ApiProperty({ required: true })
  @IsString()
  color: string;
}
