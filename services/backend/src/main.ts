import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  // CORS configuration
  app.enableCors({
    origin: ['http://localhost:3000'], // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Backend server running on: http://localhost:${port}`);
}

bootstrap();
