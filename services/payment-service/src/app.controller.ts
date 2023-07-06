import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import Stripe from 'stripe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('payment-service:ping')
  ping(from: string): string {
    return this.appService.ping(from);
  }

  // @MessagePattern('payment-service:checkout')
  // checkout(data: Stripe.Checkout.SessionCreateParams) {
  //   return this.appService.checkout(data);
  // }
}
