import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { UserSeeder } from './user.seeder';

async function runSeeds() {
  try {
    console.log('🚀 Initializing database connection...');
    await AppDataSource.initialize();
    console.log('✅ Database connection established');

    console.log('🌱 Starting database seeding...');
    console.log('=====================================');

    // Run User Seeder
    const userSeeder = new UserSeeder(AppDataSource);
    await userSeeder.run();

    console.log('=====================================');
    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run seeds if this file is executed directly
if (require.main === module) {
  runSeeds();
}
