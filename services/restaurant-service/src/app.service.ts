import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(from: string): string {
    return `Pong from restaurant-service to you ${from} !`;
  }
}
