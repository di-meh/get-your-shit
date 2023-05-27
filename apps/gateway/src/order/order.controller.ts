import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('order')
export class OrderController {
  constructor(@Inject('ORDER_SERVICE') private readonly client: ClientProxy) {}

  @Get('ping')
  ping(): Observable<string> {
    return this.client.send('order-service:ping', 'order');
  }
}
