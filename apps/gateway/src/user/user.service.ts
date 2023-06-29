import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findOne(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findOneById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async verifyUser(id: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        verified: true,
      },
    });
  }

  async addPayment(userId: string, customerId: string) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { customerId },
    });
  }
}
