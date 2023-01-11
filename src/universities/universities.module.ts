import { Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversitieSchema, Universitie } from './schemas/universities.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Universitie.name, schema: UniversitieSchema },
    ]),
  ],
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
  exports: [],
})
export class UniversitiesModule {}
