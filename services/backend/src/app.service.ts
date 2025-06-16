import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string; timestamp: string; status: string } {
    return {
      message: 'MySQL-NestJS-React Auth API',
      timestamp: new Date().toISOString(),
      status: 'running',
    };
  }

  getHealth(): { status: string; timestamp: string; uptime: number } {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
