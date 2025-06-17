import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { ERROR_CODES, ERROR_MESSAGES } from '../common/constants/error-messages';
import { UserResponseDto } from './dto/register-response.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async register(registerDto: RegisterDto): Promise<UserResponseDto> {
    const { email, username, password, displayName, bio } = registerDto;

    try {
      // Check for existing email
      const existingUserByEmail = await this.userRepository.findOne({ where: { email } });

      if (existingUserByEmail) {
        throw new ConflictException(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
      }

      // Check for existing username
      const existingUserByUsername = await this.userRepository.findOne({ where: { username } });

      if (existingUserByUsername) {
        throw new ConflictException(ERROR_MESSAGES.USERNAME_ALREADY_EXISTS);
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      const newUser = this.userRepository.create({
        email,
        username,
        password: hashedPassword,
        displayName: displayName || username,
        bio: bio || null,
        isVerified: false,
        isActive: true,
      });

      // Save user to database
      const savedUser = await this.userRepository.save(newUser);

      // Return success response with user data
      return UserResponseDto.fromUser(savedUser);
    } catch (error: unknown) {
      // Re-throw known exceptions
      if (error instanceof ConflictException) {
        throw error;
      }

      // Handle database constraint violations
      if (error && typeof error === 'object' && 'code' in error) {
        const dbError = error as { code: string; message: string };

        if (dbError.code === 'ER_DUP_ENTRY') {
          if (dbError.message.includes('email')) {
            throw new ConflictException(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
          }
          if (dbError.message.includes('username')) {
            throw new ConflictException(ERROR_MESSAGES.USERNAME_ALREADY_EXISTS);
          }
        }
      }

      // Log unexpected errors (DB connection, etc.)
      console.error('Registration error:', {
        operation: 'user.register',
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
        userEmail: email,
        username: username,
      });

      // Throw 500 error for unexpected issues
      throw new InternalServerErrorException(ERROR_MESSAGES.INTERNAL_ERROR);
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new ConflictException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new ConflictException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new ConflictException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return user;
  }
}
