import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {PrismaService} from "../prisma/prisma.service";
import {AuthService} from "./auth.service";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./auth.guard";

@Module({
  imports: [UserModule,
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  })],
  providers: [AuthService,PrismaService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
  controllers: [AuthController],
})
export class AuthModule {}
