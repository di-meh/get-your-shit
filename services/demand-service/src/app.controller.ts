import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateDemandDto } from './dto/createDemand.dto';
import {AcceptDemandDto} from "./dto/acceptDemand.dto";
import {RejectDemandDto} from "./dto/rejectDemand.dto";

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

  @MessagePattern('demand-service:getAll')
  getAll() {
    return this.appService.getAll();
  }

  @MessagePattern('demand-service:getOne')
  getOne(id: string) {
    return this.appService.getOne(id);
  }

  @MessagePattern('demand-service:accept')
  accept(data: AcceptDemandDto) {
    return this.appService.accept(data);
  }

  @MessagePattern('demand-service:reject')
  reject(data: RejectDemandDto) {
    return this.appService.reject(data);
  }

}
