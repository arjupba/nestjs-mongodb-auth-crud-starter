import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class ParamIdDto {
  @ApiProperty({ required: true })
  @IsMongoId()
  id: string;
}
