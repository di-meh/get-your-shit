import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import { ShippingModule } from './shipping/shipping.module';
import { DemandModule } from './demand/demand.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RestaurantModule,
    OrderModule,
    ShippingModule,
    DemandModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
