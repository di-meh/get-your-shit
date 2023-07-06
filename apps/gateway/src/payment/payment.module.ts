import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

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
  controllers: [PaymentController],
  providers: [UserService, PrismaService]
})
export class PaymentModule {}
