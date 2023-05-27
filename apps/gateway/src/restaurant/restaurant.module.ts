import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
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
  controllers: [RestaurantController],
})
export class RestaurantModule {}
