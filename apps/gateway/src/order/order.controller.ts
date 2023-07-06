import { Controller, Get, Inject, Post, Put, Delete, Body, Param, Request, ParseUUIDPipe, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateOrderDto } from './dto/createOrder.dto';
import { CreateOrderItemDto } from './dto/createOrderItem.dto';
import { catchError, lastValueFrom } from 'rxjs';

@Controller('order')
export class OrderController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly client: ClientProxy,
    @Inject('RESTAURANT_SERVICE') private readonly restaurantClient: ClientProxy,
  ) { }

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

  @Get('myOrders')
  getAllByUserId(@Request() req)
  {
    return this.client.send('order-service:getAllByUserId', req.user.sub);
  }

  @Get('created')
  getAllCreated() {
    return this.client.send('order-service:getAllCreated', {});
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
  async getOrderItem(@Param('id', ParseUUIDPipe) id: string) {
    const orderItem = await lastValueFrom(
      this.client
      .send('order-service:getOrderItem', id)
      .pipe(
        catchError((error) => {
        throw new InternalServerErrorException(error.message);
      })));

    for (let i = 0; i < orderItem.length; i++) {
      const productFromOrder = await lastValueFrom(
        this.restaurantClient
        .send('restaurant-service:getProductById',orderItem[i].productId)
        .pipe(
          catchError((error) => {
          throw new InternalServerErrorException(error.message);
        })));
        orderItem[i].product = productFromOrder;
    }
          
    return orderItem;
  }

  @Put('delivery/accept/:id')
  acceptOrder(@Body() orderCode: string, @Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
    return this.client.send('order-service:accept', { orderCode, id, deliveryId: req.user.sub});
  }

  @Put('delivery/restaurant/accept/:id')
  acceptOrderByRestaurant(@Body() orderCode: string, @Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
    return this.client.send('order-service:acceptByRestaurant', { orderCode, id, deliveryId: req.user.sub});
  }

  @Put('delivery/user/accept/:id')
  acceptOrderByUser(@Body() orderCode: string, @Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
    return this.client.send('order-service:acceptByUser', { orderCode, id, deliveryId: req.user.sub});
  }


  @Get(':id') // get order by id
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('order-service:getOrder', id);
  }
}
