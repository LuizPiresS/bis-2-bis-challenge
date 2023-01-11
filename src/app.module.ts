import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversitiesModule } from './universities/universities.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@db:27017'),
    UniversitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
