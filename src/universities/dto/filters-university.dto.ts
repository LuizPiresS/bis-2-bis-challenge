import { IsOptional, IsString } from 'class-validator';

export class FiltersUniversityDto {
  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  page?: string;
}
