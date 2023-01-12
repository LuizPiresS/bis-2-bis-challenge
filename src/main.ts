import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UniversityAlreadyExistsInterceptor } from './universities/errors/interceptors/university-already-exists.interceptor';
import { UniversityNotFoundInterceptor } from './universities/errors/interceptors/university-not-found.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bis2Bis - Challenge')
    .setDescription('University Management API')
    .setVersion('0.0.1')
    .addTag('Universities')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  // Global pipes
  app.useGlobalPipes(new ValidationPipe());

  // GLobal interceptors
  app.useGlobalInterceptors(new UniversityAlreadyExistsInterceptor());
  app.useGlobalInterceptors(new UniversityNotFoundInterceptor());
  await app.listen(3000);
}
bootstrap();
