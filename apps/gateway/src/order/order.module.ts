import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.ORDER_SERVICE_HOST || '',
          port: parseInt(process.env.ORDER_SERVICE_PORT || '3000'),
        },
      },
      {
        name: 'RESTAURANT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.RESTAURANT_SERVICE_HOST || '',
          port: parseInt(process.env.RESTAURANT_SERVICE_PORT || '3000'),
        },
      },
    ]),
  ],
  controllers: [OrderController],
})
export class OrderModule {}
