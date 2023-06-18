import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateDemandDto } from './dto/createDemand.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  ping(from: string): string {
    return `Pong from demand-service to you ${from} !`;
  }

  async create(data: CreateDemandDto) {
    return await this.prismaService.demand.create({ data });
  }

  async getAll() {
    return await this.prismaService.demand.findMany();
  }
}
