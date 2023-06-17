import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import {CreateDemandDto} from "./dto/createDemand.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('demand-service:ping')
  ping(from: string): string {
    return this.appService.ping(from);
  }

  @MessagePattern('demand-service:create')
  create(data: CreateDemandDto) {
      return this.appService.create(data);
  }
}
