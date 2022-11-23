import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  ContainCapitalLetter,
  ContainSmallLetter,
  ContainNumber,
  ContainSymbol,
  IsNotFreeEmail,
} from '../../../lib/validationDecorator';

export class LoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  @IsNotFreeEmail()
  username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Length(8)
  @ContainCapitalLetter()
  @ContainSmallLetter()
  @ContainNumber()
  @ContainSymbol()
  password: string;
}
