import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVegetableDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  color: string;
}
