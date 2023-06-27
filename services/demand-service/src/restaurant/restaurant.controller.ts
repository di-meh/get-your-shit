import { Controller } from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {CreateDemandDto} from "./dto/createDemand.dto";
import {AcceptDemandDto} from "./dto/acceptDemand.dto";
import {RejectDemandDto} from "./dto/rejectDemand.dto";
import {RestaurantService} from "./restaurant.service";

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    @MessagePattern('demand-service:restaurant:create')
    create(data: CreateDemandDto) {
        return this.restaurantService.create(data);
    }

    @MessagePattern('demand-service:restaurant:getAll')
    getAll() {
        return this.restaurantService.getAll();
    }

    @MessagePattern('demand-service:restaurant:getOne')
    getOne(id: string) {
        return this.restaurantService.getOne(id);
    }

    @MessagePattern('demand-service:restaurant:accept')
    accept(data: AcceptDemandDto) {
        return this.restaurantService.accept(data);
    }

    @MessagePattern('demand-service:restaurant:reject')
    reject(data: RejectDemandDto) {
        return this.restaurantService.reject(data);
    }

}
