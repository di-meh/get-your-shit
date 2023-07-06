import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {Public} from "../auth/auth.decorator";

@Controller('restaurant')
export class RestaurantController {
  constructor(
    @Inject('RESTAURANT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Public()
  @Get('ping')
  ping(): Observable<string> {
    return this.client.send('restaurant-service:ping', 'restaurant');
  }
}
