import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

import {
  ContainCapitalLetter,
  ContainNumber,
  ContainSmallLetter,
  ContainSymbol,
} from '@libs/validationDecorator';

export class RegisterUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  lastName: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(8)
  @ContainCapitalLetter()
  @ContainSmallLetter()
  @ContainNumber()
  @ContainSymbol()
  password: string;
}
