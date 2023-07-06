import { Controller } from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {DriverService} from "./driver.service";
import {CreateDemandDriverDto} from "./dto/createDemand.dto";

@Controller('driver')
export class DriverController {
    constructor(private readonly driverService: DriverService) {}

    @MessagePattern('demand-service:driver:create')
    create(data: CreateDemandDriverDto) {
        return this.driverService.create(data);
    }

    @MessagePattern('demand-service:driver:getAll')
    getAll() {
        return this.driverService.getAll();
    }

    @MessagePattern('demand-service:driver:getOne')
    getOne(id: string) {
        return this.driverService.getOne(id);
    }

    @MessagePattern('demand-service:driver:accept')
    accept(data: { id: string; reviewerId: string }) {
        return this.driverService.accept(data);
    }

    @MessagePattern('demand-service:driver:reject')
    reject(data: { id: string, reviewerId: string }) {
        return this.driverService.reject(data);
    }




}
