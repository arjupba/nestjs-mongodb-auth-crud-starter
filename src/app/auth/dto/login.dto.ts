import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

import { RoleEnum } from '@apps/users/domain/user.type';

export class LoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    enum: RoleEnum,
    enumName: 'RoleEnum',
    example: RoleEnum.User,
    required: true,
  })
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
