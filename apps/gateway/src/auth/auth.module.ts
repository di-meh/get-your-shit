import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { MailService } from '../mail/mail.service';
import {RolesGuard} from "./roles.guard";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    MailService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
