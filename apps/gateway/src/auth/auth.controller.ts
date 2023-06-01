import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_USER_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get('ping')
  ping(): Observable<string> {
    return this.client.send('auth-user-service:ping', 'auth');
  }

  @Get('register')
  register(): Observable<string> {
    return this.client.send('auth-user-service:register', {
      username: 'test',
      password: 'admin',
      email: 'test@hehe.fr',
    });
  }

  @Get('login')
  login(): Observable<string> {
    return this.client.send('auth-user-service:login', {
      username: 'test',
      password: 'admin',
    });
  }
}
