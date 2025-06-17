import { loadConfig } from '@mysql-nest-react/shared';
import { DataSource } from 'typeorm';
import { User } from '../auth/entities/user.entity';

const config = loadConfig();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [User],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: config.database.logging,
  charset: 'utf8mb4',
  timezone: '+00:00',
});
