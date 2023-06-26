import {ForbiddenException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateDemandDto } from './dto/createDemand.dto';
import {AcceptDemandDto} from "./dto/acceptDemand.dto";
import {RpcException} from "@nestjs/microservices";
import {RejectDemandDto} from "./dto/rejectDemand.dto";

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
    return await this.prismaService.demand.findMany({where: {reviewedBy: null}});
  }

  async getOne(id: string) {
    return await this.prismaService.demand.findUnique({ where: { id } });
  }

  async accept(data: AcceptDemandDto) {
    const demand = await this.getOne(data.id);
    if (!demand) {
        throw new RpcException('Demand not found');
    }
    if (demand.approved || demand.reviewedBy !== null) {
      throw new RpcException('Demand already reviewed');
    }
    return await this.prismaService.demand.update({
      where: { id: data.id },
      data: {
        approved: true,
        reviewedBy: data.reviewerId,
      },
    });
  }

  async reject(data: RejectDemandDto) {
    const demand = await this.getOne(data.id);
    if (!demand) {
      throw new RpcException('Demand not found');
    }
    if (demand.approved || demand.reviewedBy !== null) {
      throw new RpcException('Demand already reviewed');
    }
    return await this.prismaService.demand.update({
        where: { id: data.id },
        data: {
            approved: false,
            reviewedBy: data.reviewerId,
        }
    });
  }
}
