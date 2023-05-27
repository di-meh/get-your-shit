import { Module } from '@nestjs/common';
import { ShippingController } from './shipping.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SHIPPING_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.SHIPPING_SERVICE_HOST || '',
          port: parseInt(process.env.SHIPPING_SERVICE_PORT || '3000'),
        },
      },
    ]),
  ],
  controllers: [ShippingController],
})
export class ShippingModule {}
