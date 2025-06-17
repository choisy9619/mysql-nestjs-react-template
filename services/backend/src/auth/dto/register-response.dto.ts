import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({ description: 'User unique identifier' })
  id: number;

  @ApiProperty({ description: 'User email address' })
  email: string;

  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'User display name', required: false })
  displayName?: string;

  @ApiProperty({ description: 'User bio', required: false })
  bio?: string;

  @ApiProperty({ description: 'Email verification status' })
  isVerified: boolean;

  @ApiProperty({ description: 'Account active status' })
  isActive: boolean;

  @ApiProperty({ description: 'Account creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;

  constructor(user: Partial<User>) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.displayName = user.displayName;
    this.bio = user.bio;
    this.isVerified = user.isVerified;
    this.isActive = user.isActive;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  static fromUser(user: User): UserResponseDto {
    return new UserResponseDto(user);
  }
}

// 회원가입 응답 타입
export type RegisterResponseDto = UserResponseDto;
