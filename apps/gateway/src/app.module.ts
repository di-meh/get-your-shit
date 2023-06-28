import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import { ShippingModule } from './shipping/shipping.module';
import { DemandModule } from './demand/demand.module';
import { PaymentModule } from './payment/payment.module';
import { MailModule } from './mail/mail.module';
import {MailerModule} from "@nestjs-modules/mailer";

@Module({
  imports: [
      MailerModule.forRoot({
        transport: process.env.SMTP_URL,
        defaults: {
          from: '“Get Your Shit" <hello@gys.com>'
        }
      }),
    AuthModule,
    UserModule,
    RestaurantModule,
    OrderModule,
    ShippingModule,
    DemandModule,
    PaymentModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
