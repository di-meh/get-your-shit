import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(from: string): string {
    return `Pong from demand-service to you ${from} !`;
  }
}
