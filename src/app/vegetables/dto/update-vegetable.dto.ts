import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, IsOptional, IsHexColor } from 'class-validator';

export class UpdateVegetableDto {
  @ApiProperty({ required: true })
  @IsOptional()
  name: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsHexColor()
  color: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price: string;
}
