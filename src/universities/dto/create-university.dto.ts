import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUniversityDto {
  @ApiProperty({ example: '["http://teste.com"]' })
  @IsArray()
  @IsString({ each: true })
  web_pages: string[];

  @ApiProperty({ example: 'RS' })
  @IsString()
  readonly state_province: string;

  @ApiProperty({ example: 'BR' })
  @IsString()
  readonly alpha_two_code: string;

  @ApiProperty({ example: 'Brazil' })
  @IsString()
  readonly country: string;

  @ApiProperty({ example: '["teste.com"]' })
  @IsArray()
  @IsString({ each: true })
  readonly domains: string[];

  @ApiProperty({ example: 'Universidade de teste' })
  @IsString()
  readonly name: string;
}
