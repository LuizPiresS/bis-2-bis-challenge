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
import { UniversityAlreadyExistsError } from './errors/types/university-already-exists.error';

@Injectable()
export class UniversitiesService implements OnModuleInit {
  constructor(
    @InjectModel(Universitie.name)
    private universityModel: Model<UniversitieDocument>,
    private readonly httpService: HttpService,
  ) {}

  public async onModuleInit(): Promise<void> {
    const count = await this.universityModel.count();

    if (!count) {
      const universities = await this.getuniversityData();
      await this.create(universities);
      console.log('Data has been successfully migrated');
    }
  }

  public async create(createUniversityDto: CreateUniversityDto) {
    const universityExists = await this.universityModel.count({
      name: createUniversityDto.name,
      country: createUniversityDto.country,
      state_province: createUniversityDto.state_province,
    });

    if (!universityExists) {
      return await this.universityModel.create(createUniversityDto);
    }

    throw new UniversityAlreadyExistsError('University already registered');
  }

  public async findAll(filters: FiltersUniversityDto) {
    if (!filters.page) {
      const data = await this.universityModel.find({ ...filters });
      return {
        page: `all records of ${filters.country}`,
        total: data.length,
        data,
      };
    }
    const page: number = +filters.page || 1;
    const limit = 20;

    const universities = await this.universityModel
      .find({ ...filters })
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      page: page,
      total: universities.length,
      data: universities,
    };
  }

  findById(id: string) {
    return this.universityModel.findOne({ _id: id });
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
