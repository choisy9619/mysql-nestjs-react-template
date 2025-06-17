import { ApiResponse } from '@/common';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserResponseDto } from './dto/register-response.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Create a new user account with email, username and password',
  })
  @ApiBody({
    type: RegisterDto,
    description: 'User registration data',
  })
  @SwaggerResponse({
    status: 201,
    description: 'User successfully created',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Account created successfully' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            email: { type: 'string', example: 'user@example.com' },
            username: { type: 'string', example: 'testuser' },
            displayName: { type: 'string', example: 'Test User' },
            bio: { type: 'string', example: null },
            isVerified: { type: 'boolean', example: false },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
          },
        },
      },
    },
  })
  @SwaggerResponse({
    status: 400,
    description: 'Invalid input data',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['email must be a valid email'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @SwaggerResponse({
    status: 409,
    description: 'Email or username already exists',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'This email is already registered' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  @SwaggerResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Something went wrong. Please try again later' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async register(@Body() registerDto: RegisterDto): Promise<ApiResponse<UserResponseDto>> {
    const user = await this.authService.register(registerDto);
    return ApiResponse.success(user, 'Account created successfully');
  }
}
