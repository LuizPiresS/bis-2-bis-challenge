import { Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversitySchema, University } from './schemas/universities.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: University.name, schema: UniversitySchema },
    ]),
  ],
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
  exports: [],
})
export class UniversitiesModule {}
