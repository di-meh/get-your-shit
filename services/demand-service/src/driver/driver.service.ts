import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { CreateDemandDriverDto } from './dto/createDemand.dto';


@Injectable()
export class DriverService {
    constructor(private readonly prismaService: PrismaService) {}


    create(data: CreateDemandDriverDto) {
        return this.prismaService.driverDemand.create({ data: { ...data, date_birth: new Date(data.date_birth) } });
    }

    getAll() {
        return this.prismaService.driverDemand.findMany({where: {reviewedBy: null}});
    }

    getOne(id: string) {
        return this.prismaService.driverDemand.findUnique({ where: { id } });
    }

    accept(data:  { id: string; reviewerId: string }) {
        return this.prismaService.driverDemand.update({
            where: { id: data.id },
            data: { approved: true, reviewedBy: data.reviewerId },
        });
    }

    reject(data: { id: string; reviewerId: string }) {
        return this.prismaService.driverDemand.update({
            where: { id: data.id },
            data: { approved: false, reviewedBy: data.reviewerId },
        });
    }

  
}
