import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [RestaurantModule, DriverModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
