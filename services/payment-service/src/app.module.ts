import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { StripeService } from './stripe.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, StripeService],
})
export class AppModule {}
