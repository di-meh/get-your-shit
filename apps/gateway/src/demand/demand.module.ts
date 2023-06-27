import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { DriverDemandController } from './driver.controller';
import { RestaurantDemandController } from './restaurant.controller';

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
    AuthModule,
    UserModule,
  ],
  controllers: [RestaurantDemandController, DriverDemandController],
})
export class DemandModule {}
