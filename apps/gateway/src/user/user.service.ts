import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

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

  async updateUser(id: string, data: any) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async updateMe(id: string, data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    if (data.date_birth) {
      data.date_birth = new Date(data.date_birth);
    }
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
