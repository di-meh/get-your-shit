import { Controller, Get, Inject, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    @Inject('RESTAURANT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  getAll() {
    return this.client.send('restaurant-service:getAll', {});
  }

  // get by id
  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('restaurant-service:getById', id);
  }

  @Post()
  create(@Body() data: CreateRestaurantDto) {
    return this.client.send('restaurant-service:create', data);
  }
  
}
