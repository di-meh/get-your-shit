import { Injectable } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Injectable()
export class AppService {
  constructor(private readonly stripeService: StripeService) { }

  // checkout(data: Stripe.Checkout.SessionCreateParams) {
  //     const session: Stripe.Checkout.Session = this.stripeService.stripe.checkout.sessions.create(data);
      
  // }
  
  ping(from: string): string {
    return `Pong from payment-service to you ${from} !`;
  }
}
