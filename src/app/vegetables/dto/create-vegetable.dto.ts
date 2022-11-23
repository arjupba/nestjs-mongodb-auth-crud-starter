import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateVegetableDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: string;
}
