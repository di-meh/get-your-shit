import { Module } from '@nestjs/common';
import { DemandController } from './demand.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DEMAND_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.DEMAND_SERVICE_HOST || '',
          port: parseInt(process.env.DEMAND_SERVICE_PORT || '3000'),
        },
      },
    ]),
  ],
  controllers: [DemandController],
})
export class DemandModule {}