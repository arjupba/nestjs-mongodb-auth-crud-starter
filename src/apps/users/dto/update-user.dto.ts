import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDtoAdmin {
  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  lastName: string;
}

export class UpdateUserDtoSelf {
  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  lastName: string;
}
