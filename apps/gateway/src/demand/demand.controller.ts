import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('demand')
export class DemandController {
  constructor(@Inject('DEMAND_SERVICE') private readonly client: ClientProxy) {}

  @Get('ping')
  ping(): Observable<string> {
    return this.client.send('demand-service:ping', 'demand');
  }
}
