import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UniversityAlreadyExistsInterceptor } from './universities/errors/interceptors/university-already-exists.interceptor';
import { UniversityNotFoundInterceptor } from './universities/errors/interceptors/university-not-found.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global pipes
  app.useGlobalPipes(new ValidationPipe());

  // GLobal interceptors
  app.useGlobalInterceptors(new UniversityAlreadyExistsInterceptor());
  app.useGlobalInterceptors(new UniversityNotFoundInterceptor());
  await app.listen(3000);
}
bootstrap();
