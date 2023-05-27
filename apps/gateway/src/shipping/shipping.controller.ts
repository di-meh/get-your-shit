import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('shipping')
export class ShippingController {
  constructor(
    @Inject('SHIPPING_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get('ping')
  ping(): Observable<string> {
    return this.client.send('shipping-service:ping', 'shipping');
  }
}
