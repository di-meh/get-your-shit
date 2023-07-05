import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/createOrder.dto';
import { CreateOrderItemDto } from './dto/createOrderItem.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('order-service:ping')
  ping(from: string): string {
    return this.appService.ping(from);
  }

  @MessagePattern('order-service:create')
  createOrder(data: CreateOrderDto): any {
    return this.appService.createOrder(data);
  }

  @MessagePattern('order-service:getAll')
  getAll(): any {
    return this.appService.getAll();
  }

  @MessagePattern('order-service:getOrderByRestaurantId')
  getOrderByRestaurantId(id: string): any {
    return this.appService.getOrderByRestaurantId(id);
  }

  @MessagePattern('order-service:getOrderItem')
  getOrderItem(id: string): any {
    return this.appService.getOrderItemByOrderId(id);
  }
  

  @MessagePattern('order-service:delete')
  deleteOrder(data: CreateOrderDto): any {
    return this.appService.deleteOrder(data);
  }

  @MessagePattern('order-service:item:create')
  createOrderItem(data: CreateOrderItemDto): any {
    return this.appService.createOrderItem(data);
  }

  @MessagePattern('order-service:accept')
  acceptOrder(data: any): any {
    return this.appService.acceptOrder(data);
  }

  @MessagePattern('order-service:acceptByRestaurant')
  acceptOrderByRestaurant(data: any): any {
    return this.appService.acceptOrderByRestaurant(data);
  }

  @MessagePattern('order-service:acceptByUser')
  acceptOrderByUser(data: any): any {
    return this.appService.acceptOrderByUser(data);
  }

  @MessagePattern('order-service:getOrder')
  getOrder(id: string): any {
    return this.appService.getOrder(id);
  }


 

}
