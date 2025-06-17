import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { message: string; timestamp: string; status: string } {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string; uptime: number } {
    return this.appService.getHealth();
  }
}
