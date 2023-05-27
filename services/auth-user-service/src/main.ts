import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.APP_HOST || '',
        port: parseInt(process.env.APP_PORT || '3000'),
      },
    },
  );
  await app.listen();
}
bootstrap();
