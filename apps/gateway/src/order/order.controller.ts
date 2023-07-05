import { Controller, Get, Inject, Post, Put, Delete, Body, Param, Request, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateOrderDto } from './dto/createOrder.dto';
import { CreateOrderItemDto } from './dto/createOrderItem.dto';

@Controller('order')
export class OrderController {
  constructor(@Inject('ORDER_SERVICE') private readonly client: ClientProxy) { }

  @Get('ping')
  ping(): Observable<string> {
    return this.client.send('order-service:ping', 'order');
  }

  @Post('create')
  createOrder(@Body() data: CreateOrderDto) {
    return this.client.send('order-service:create', data);
  }

  @Delete('delete/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('order-service:delete', id);
  }

  @Get()
  getAll() {
    return this.client.send('order-service:getAll', {});
  }

  @Get('restaurant/:id')
  getOrderByRestaurantId(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('order-service:getOrderByRestaurantId', id);
  }


  @Post('item')
  createOrderItem(@Body() data: CreateOrderItemDto) {
    return this.client.send('order-service:item:create', data);
  }

  @Get('item/:id')
  getOrderItem(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('order-service:getOrderItem', id);
  }

  @Put('delivery/accept/:id')
  acceptOrder(@Body() orderCode: string, @Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
    return this.client.send('order-service:accept', { orderCode, id, deliveryId: req.user.sub});
  }

  @Put('delivery/restaurant/accept/:id')
  acceptOrderByRestaurant(@Body() orderCode: string, @Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
    return this.client.send('order-service:acceptByRestaurant', { orderCode, id, restaurantId: req.user.sub});
  }

  @Put('delivery/user/accept/:id')
  acceptOrderByUser(@Body() orderCode: string, @Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
    return this.client.send('order-service:acceptByUser', { orderCode, id, userId: req.user.sub});
  }


  @Get(':id') // get order by id
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('order-service:getOrder', id);
  }
}
