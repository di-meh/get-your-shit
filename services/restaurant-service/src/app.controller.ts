import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('restaurant-service:create')
  create(data: CreateRestaurantDto) {
    return this.appService.create(data);
  }
}
