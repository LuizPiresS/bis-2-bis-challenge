import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UniversityAlreadyExistsInterceptor } from './universities/errors/interceptors/university-already-exists.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global pipes
  app.useGlobalPipes(new ValidationPipe());

  // GLobal interceptors
  app.useGlobalInterceptors(new UniversityAlreadyExistsInterceptor());
  await app.listen(3000);
}
bootstrap();
