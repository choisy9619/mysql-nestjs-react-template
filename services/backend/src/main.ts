import { loadConfig } from '@mysql-nest-react/shared';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const config = loadConfig();

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
    origin: config.cors.origin,
    credentials: config.cors.credentials,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 포트 설정
  await app.listen(config.app.port);

  console.log(`🚀 Backend server running on: http://localhost:${config.app.port}`);
  console.log(`📝 Environment: ${config.app.nodeEnv}`);
  console.log(`🔗 CORS origin: ${config.cors.origin}`);
}

bootstrap();
