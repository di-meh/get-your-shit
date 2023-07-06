import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { RpcException } from "@nestjs/microservices";
@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) { }

  ping(from: string): string {
    return `Pong from order-service to you ${from} !`;
  }

  async createOrder(data: CreateOrderDto) {
    return this.prisma.order.create({ data });
  }

  async deleteOrder(data: CreateOrderDto) {
    return this.prisma.order.delete({ where: { id: data.id } });
  }

  async getAll() {
    return this.prisma.order.findMany({});
  }

  async getAllByUserId(id: string) {
    return this.prisma.order.findMany({ where: { buyerId: id } });
  }

  async getAllCreated() {
    return this.prisma.order.findMany({ where: { status: 'CREATED' } });
  }


  async getOrderByRestaurantId(id: string) {
    return this.prisma.order.findMany({ where: { restaurantId: id } });
  }

  async getOrderItemByOrderId(id: string) {
    return this.prisma.orderItem.findMany({ where: { orderId: id } });
  }

  async createOrderItem(data: any) {
    return this.prisma.orderItem.create({ data });
  }

  async getOrder(id: string) {
    return this.prisma.order.findUnique({ where: { id } });
  }

  async acceptOrder(data: any) {
    const order = await this.getOrder(data.id);
    if (!order) {
      throw new RpcException('Order not found');
    }
    if (parseInt(order.orderCode) !== parseInt(data.orderCode.orderCode)) {
      throw new RpcException('Order code is not valid');
    } else {
      const randomOrderCode = Math.floor(10000 + Math.random() * 90000);
      return this.prisma.order.update({
        where: { id: data.id },
        data: {
          status: 'PICKINGUP',
          deliveryId: data.deliveryId,
          orderCode: randomOrderCode.toString(), 
        },
      });
    }
  }

  async acceptOrderByRestaurant(data: any) {
    const order = await this.getOrder(data.id);
    if (order.deliveryId !== data.deliveryId) {
      throw new RpcException('Delivery id is not valid');
    } 
    if (!order) {  
      throw new RpcException('Order not found');
    }
    if (parseInt(order.orderCode) !== parseInt(data.orderCode.orderCode)) {
      throw new RpcException('Order code is not valid');
    } else {
      const randomOrderCode = Math.floor(10000 + Math.random() * 90000);
      return this.prisma.order.update({
        where: { id: data.id },
        data: {
          status: 'DELIVERING',
          orderCode: randomOrderCode.toString(), 
        },
      });
    }
  }

  async acceptOrderByUser(data: any) {
    const order = await this.getOrder(data.id);
    if (order.deliveryId !== data.deliveryId) {
      throw new RpcException('Delivery id is not valid');
    } 
    if (!order) {
      throw new RpcException('Order not found');
    }
    if (parseInt(order.orderCode) !== parseInt(data.orderCode.orderCode)) {
      throw new RpcException('Order code is not valid');
    } else {
      const randomOrderCode = Math.floor(10000 + Math.random() * 90000);
      return this.prisma.order.update({
        where: { id: data.id },
        data: {
          status: 'DELIVERED',
          orderCode: randomOrderCode.toString(),
        },
      });
    }
  }






}



