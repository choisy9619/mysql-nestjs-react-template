import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'Username (3-20 characters, letters, numbers, underscores only)',
    example: 'testuser',
    minLength: 3,
    maxLength: 20,
    pattern: '^[a-zA-Z0-9_]+$',
  })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  @MaxLength(20, { message: 'Username must not exceed 20 characters' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers and underscores',
  })
  username: string;

  @ApiProperty({
    description:
      'Password (minimum 8 characters, must contain uppercase, lowercase, number, and special character)',
    example: 'MyPassword123!',
    minLength: 8,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]',
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain uppercase, lowercase, number and special character',
  })
  password: string;

  @ApiProperty({
    description: 'Display name for the user (optional, max 50 characters)',
    example: 'Test User',
    required: false,
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Display name must be a string' })
  @MaxLength(50, { message: 'Display name must not exceed 50 characters' })
  displayName?: string;

  @ApiProperty({
    description: 'User bio (optional, max 500 characters)',
    example: 'This is my bio',
    required: false,
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Bio must be a string' })
  @MaxLength(500, { message: 'Bio must not exceed 500 characters' })
  bio?: string;
}
