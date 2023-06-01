import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {

  constructor(private readonly prismaService: PrismaService) {}
  ping(from: string): string {
    return `Pong from auth-user-service to you ${from} !`;
  }

  
  async register(username: string, password: string, email: string): Promise<string> {
    const existingUser = await this.prismaService.user.findUnique({ where: { username } });

    if (existingUser) {
      return 'Username already exists';
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prismaService.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });

    return `User ${username} registered!`;
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.prismaService.user.findUnique({ where: { username } });

    if (!user) {
      return 'User not found';
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return 'Invalid password';
    }

    return 'Login successful';
  }




}
