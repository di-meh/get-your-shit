import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_USER_SERVICE_HOST || '',
          port: parseInt(process.env.AUTH_USER_SERVICE_PORT || '3000'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
