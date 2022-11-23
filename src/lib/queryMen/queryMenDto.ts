import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({
    minimum: 1,
    maximum: 30,
    default: 1,
  })
  @ApiPropertyOptional()
  page: number;

  @ApiProperty({
    minimum: 1,
    maximum: 1000,
    default: 30,
  })
  @ApiPropertyOptional()
  limit: number;

  @ApiProperty({
    default: '-createdAt',
  })
  @ApiPropertyOptional()
  sort: string;
}
