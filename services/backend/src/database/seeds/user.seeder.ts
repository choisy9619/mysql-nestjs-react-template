import * as bcrypt from 'bcryptjs';
import { DataSource } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

export class UserSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const userRepository = this.dataSource.getRepository(User);

    // Check if users already exist
    const existingUsersCount = await userRepository.count();
    if (existingUsersCount > 0) {
      console.log('👥 Users already exist, skipping seeding...');
      return;
    }

    console.log('🌱 Seeding users...');

    // Hash passwords
    const hashedPassword = await bcrypt.hash('password123', 10);
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);

    // Create seed users
    const seedUsers = [
      {
        email: 'admin@sns.com',
        username: 'admin',
        password: hashedAdminPassword,
        displayName: 'Administrator',
        bio: 'System administrator of the SNS platform',
        isVerified: true,
        isActive: true,
      },
      {
        email: 'john.doe@sns.com',
        username: 'johndoe',
        password: hashedPassword,
        displayName: 'John Doe',
        bio: '👋 Hello! I love sharing my daily moments here.',
        isVerified: true,
        isActive: true,
      },
      {
        email: 'jane.smith@sns.com',
        username: 'janesmith',
        password: hashedPassword,
        displayName: 'Jane Smith',
        bio: '📸 Photographer | 🌍 Travel enthusiast | ☕ Coffee lover',
        isVerified: false,
        isActive: true,
      },
      {
        email: 'mike.wilson@sns.com',
        username: 'mikewilson',
        password: hashedPassword,
        displayName: 'Mike Wilson',
        bio: '💻 Developer | 🎮 Gamer | 🍕 Pizza enthusiast',
        isVerified: true,
        isActive: true,
      },
      {
        email: 'test.user@sns.com',
        username: 'testuser',
        password: hashedPassword,
        displayName: 'Test User',
        bio: 'This is a test account for development purposes',
        isVerified: false,
        isActive: true,
      },
    ];

    try {
      // Insert users
      const users = userRepository.create(seedUsers);
      await userRepository.save(users);

      console.log('✅ Successfully seeded users:');
      console.log('  👑 admin@sns.com (admin123)');
      console.log('  👤 john.doe@sns.com (password123)');
      console.log('  👤 jane.smith@sns.com (password123)');
      console.log('  👤 mike.wilson@sns.com (password123)');
      console.log('  🧪 test.user@sns.com (password123)');
      console.log('');
      console.log('🔐 Default passwords:');
      console.log('  - Admin: admin123');
      console.log('  - Others: password123');
    } catch (error) {
      console.error('❌ Error seeding users:', error);
      throw error;
    }
  }
}
