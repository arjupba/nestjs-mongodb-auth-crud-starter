import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsArray,
  IsBoolean,
  Length,
  IsOptional,
} from 'class-validator';
import { RoleEnum } from '../entities/user.entity';
import {
  ContainCapitalLetter,
  ContainSmallLetter,
  ContainNumber,
  ContainSymbol,
  IsNotFreeEmail,
} from '../../../lib/validationDecorator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  @IsNotFreeEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Length(8)
  @ContainCapitalLetter()
  @ContainSmallLetter()
  @ContainNumber()
  @ContainSymbol()
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  avatar: string;

  @ApiProperty({ enum: RoleEnum, default: [RoleEnum.User], isArray: true })
  @IsEnum(RoleEnum, { each: true })
  @IsArray()
  roles: RoleEnum[] = [RoleEnum.User];

  @ApiProperty({ default: true })
  @IsBoolean()
  isEnabled?: boolean = true;
}
