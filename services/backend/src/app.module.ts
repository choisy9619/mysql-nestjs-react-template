import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Environment configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database configuration - 임시로 비활성화
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get('DB_HOST', 'localhost'),
    //     port: configService.get('DB_PORT', 3306),
    //     username: configService.get('DB_USERNAME', 'root'),
    //     password: configService.get('DB_PASSWORD', 'password'),
    //     database: configService.get('DB_NAME', 'mysql_nest_react'),
    //     entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    //     synchronize: configService.get('NODE_ENV') !== 'production',
    //     logging: configService.get('NODE_ENV') === 'development',
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
