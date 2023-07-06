import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {Public} from "../auth/auth.decorator";

@Controller('shipping')
export class ShippingController {
  constructor(
    @Inject('SHIPPING_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Public()
  @Get('ping')
  ping(): Observable<string> {
    return this.client.send('shipping-service:ping', 'shipping');
  }
}
