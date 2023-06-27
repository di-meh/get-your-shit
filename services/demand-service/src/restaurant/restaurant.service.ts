import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {CreateDemandDto} from "./dto/createDemand.dto";
import {AcceptDemandDto} from "./dto/acceptDemand.dto";
import {RpcException} from "@nestjs/microservices";
import {RejectDemandDto} from "./dto/rejectDemand.dto";

@Injectable()
export class RestaurantService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: CreateDemandDto) {
        return await this.prismaService.restaurantDemand.create({ data });
    }

    async getAll() {
        return await this.prismaService.restaurantDemand.findMany({where: {reviewedBy: null}});
    }

    async getOne(id: string) {
        return await this.prismaService.restaurantDemand.findUnique({ where: { id } });
    }

    async accept(data: AcceptDemandDto) {
        const demand = await this.getOne(data.id);
        if (!demand) {
            throw new RpcException('Demand not found');
        }
        if (demand.approved || demand.reviewedBy !== null) {
            throw new RpcException('Demand already reviewed');
        }
        return await this.prismaService.restaurantDemand.update({
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
        return await this.prismaService.restaurantDemand.update({
            where: { id: data.id },
            data: {
                approved: false,
                reviewedBy: data.reviewerId,
            }
        });
    }
}
