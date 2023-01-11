import { IsArray, IsString } from 'class-validator';

export class CreateUniversityDto {
  @IsArray()
  @IsString({ each: true })
  web_pages: string[];

  @IsString()
  readonly state_province: string;

  @IsString()
  readonly alpha_two_code: string;

  @IsString()
  readonly country: string;

  @IsArray()
  @IsString({ each: true })
  readonly domains: string[];

  @IsString()
  readonly name: string;
}
