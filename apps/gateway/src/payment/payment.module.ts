import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.PAYMENT_SERVICE_HOST || '',
          port: parseInt(process.env.PAYMENT_SERVICE_PORT || '3000'),
        },
      },
    ]),
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
