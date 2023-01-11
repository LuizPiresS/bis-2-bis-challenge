import { Injectable, OnModuleInit } from '@nestjs/common';

import { CreateUniversityDto } from './dto/create-university.dto';
import { FiltersUniversityDto } from './dto/filters-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import {
  Universitie,
  UniversitieDocument,
} from './schemas/universities.schema';
import { Model } from 'mongoose';

@Injectable()
export class UniversitiesService implements OnModuleInit {
  constructor(
    @InjectModel(Universitie.name)
    private universityModel: Model<UniversitieDocument>,
    private readonly httpService: HttpService,
  ) {}

  public async onModuleInit(): Promise<void> {
    const count = await this.universityModel.count();

    if (count === 0) {
      const universities = await this.getuniversityData();
      await this.create(universities);
    }
  }

  public async create(createUniversityDto: CreateUniversityDto) {
    await this.universityModel.create(createUniversityDto);
  }

  public async findAll(filters: FiltersUniversityDto) {
    const pageN: number = +filters.page || 1;
    const limit = 20;
    const total = await this.universityModel
      .count({ ...filters })
      .skip((pageN - 1) * limit)
      .limit(limit);

    const universities = await this.universityModel
      .find({ ...filters })
      .skip((pageN - 1) * limit)
      .limit(limit);

    return {
      page: pageN,
      total: total,
      data: universities,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} university`;
  }

  update(id: number, updateUniversityDto: UpdateUniversityDto) {
    return `This action updates a #${id} university`;
  }

  remove(id: number) {
    return `This action removes a #${id} university`;
  }

  public async getuniversityData(): Promise<any> {
    const countries = [
      'argentina',
      'brazil',
      'chile',
      'colombia',
      'paraguay',
      'peru',
      'suriname',
      'uruguay',
    ];

    const universities = [];
    for (const country of countries) {
      const response = await this.httpService.axiosRef.get(
        `http://universities.hipolabs.com/search?country=${country}`,
      );

      universities.push(...response.data);
    }
    return universities;
  }
}
