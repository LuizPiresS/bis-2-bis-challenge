import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FiltersUniversityDto {
  @ApiProperty({ example: 'Brazil' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ example: 'Universidade de teste' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 1 })
  @IsString()
  @IsOptional()
  page?: string;
}
