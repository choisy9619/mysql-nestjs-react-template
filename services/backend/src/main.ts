import { loadConfig } from '@mysql-nest-react/shared';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  // Swagger 설정
  const swaggerConfig = new DocumentBuilder()
    .setTitle('MySQL NestJS React API')
    .setDescription('API documentation for MySQL NestJS React template')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addBearerAuth() // JWT 인증을 위한 설정
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'MySQL NestJS React API Docs',
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });

  // 포트 설정
  await app.listen(config.app.port);

  console.log(`🚀 Backend server running on: http://localhost:${config.app.port}`);
  console.log(`📚 API Documentation: http://localhost:${config.app.port}/api-docs`);
  console.log(`📝 Environment: ${config.app.nodeEnv}`);
  console.log(`🔗 CORS origin: ${config.cors.origin}`);
}

bootstrap();
