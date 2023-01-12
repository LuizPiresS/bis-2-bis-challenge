import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { FiltersUniversityDto } from './dto/filters-university.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @ApiResponse({ status: 400, description: 'University already registered' })
  @ApiTags('Universities')
  @Post()
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universitiesService.create(createUniversityDto);
  }

  @ApiTags('Universities')
  @Get()
  findAll(@Query() filters: FiltersUniversityDto) {
    return this.universitiesService.findAll(filters);
  }

  @ApiTags('Universities')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.universitiesService.findById(id);
  }

  @ApiTags('Universities')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUniversityDto: UpdateUniversityDto,
  ) {
    return this.universitiesService.update(id, updateUniversityDto);
  }

  @ApiTags('Universities')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universitiesService.remove(id);
  }
}
