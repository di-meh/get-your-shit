import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('auth-user-service:ping')
  ping(from: string): string {
    return this.appService.ping(from);
  }

  @MessagePattern('auth-user-service:register')
  async register(data: any) {
    const result = this.appService.register(data.username, data.password, data.email);
    return this.appService.register(data.username, data.password, data.email);
  }

  @MessagePattern('auth-user-service:login')
  async login(data: any) {
    const result = this.appService.login(data.username, data.password);
    return this.appService.login(data.username, data.password);
  }
}
