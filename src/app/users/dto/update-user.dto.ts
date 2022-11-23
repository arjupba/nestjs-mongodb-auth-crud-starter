import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsArray,
  IsBoolean,
  Length,
} from 'class-validator';
import { RoleEnum } from '../entities/user.entity';
import {
  ContainCapitalLetter,
  ContainSmallLetter,
  ContainNumber,
  ContainSymbol,
} from '../../../lib/validationDecorator';
export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Length(8)
  @ContainCapitalLetter()
  @ContainSmallLetter()
  @ContainNumber()
  @ContainSymbol()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  avatar: string;

  @ApiProperty({ enum: RoleEnum, isArray: true })
  @IsEnum(RoleEnum, { each: true })
  @IsArray()
  roles: RoleEnum[] = [];

  @ApiProperty({})
  @IsOptional()
  @IsBoolean()
  isEnabled?: Boolean;
}
