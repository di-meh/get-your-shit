import { BadRequestException, Controller, Get, Post, Body, Headers, Inject, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, last, lastValueFrom } from 'rxjs';
import { Public } from '../auth/auth.decorator';
import Stripe from 'stripe';
import { log } from 'console';
import { UserService } from 'src/user/user.service';

@Controller('payment')
export class PaymentController {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly client: ClientProxy,
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
    @Inject('RESTAURANT_SERVICE') private readonly restaurantClient: ClientProxy,
    private readonly userService: UserService
  ) {}

  @Public()
  @Get('ping')
  ping(): Observable<string> {
    return this.client.send('payment-service:ping', 'payment');
  }

  @Public()
  @Post('stripe')
  async stripe(@Req() req, @Headers() headers) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,
      {
        apiVersion: '2022-11-15',
      }
    )

    const sig = headers['stripe-signature'];
    
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const user = await this.userService.findByEmail(session.customer_email);
        if (!user) {
          throw new BadRequestException(`User not found`);
        }
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ['data.price']
        })
        
        const orderData = {
          buyerId: user.id,
          totalPrice: 0,
          orderCode: Math.floor(10000 + Math.random() * 90000).toString(),
          restaurantId: ''
        }

        let totalPrice = 0;
        for (const item of lineItems.data) {
          totalPrice += item.amount_total;
          const product = await lastValueFrom(this.restaurantClient.send('restaurant-service:getProductByPriceId', item.price.id));
          orderData.restaurantId = product.restaurantId;
        }
        orderData.totalPrice = totalPrice / 100;

        const order = await lastValueFrom(this.orderClient.send('order-service:create', orderData));
        
        return order;
      default:
        throw new BadRequestException(`Unhandled event type ${event.type}`);
    }

  }


}
