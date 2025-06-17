import { User } from '@/auth/entities/user.entity';
import { loadConfig } from '@mysql-nest-react/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const config = loadConfig();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.name,
      entities: [User],
      migrations: ['dist/database/migrations/*.js'],
      migrationsRun: false, // Set to true for auto-run in development
      synchronize: config.database.synchronize,
      logging: config.database.logging,
      charset: 'utf8mb4',
      timezone: '+00:00',
      extra: {
        connectionLimit: 10,
        acquireTimeout: 60000,
        timeout: 60000,
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
