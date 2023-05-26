import {Controller, Get, Inject} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {Observable} from "rxjs";

@Controller()
export class AppController {

  constructor(
      @Inject('AUTH_USER_SERVICE') private client: ClientProxy,
  ) {}

  @Get('/auth-user-service')
  getHello(): Observable<string> {
    return this.client.send("auth-user-service:ping", "ping");
  }
}
