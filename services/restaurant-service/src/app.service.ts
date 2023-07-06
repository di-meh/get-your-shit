import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  create(data: CreateRestaurantDto) {
    return this.prismaService.restaurant.create({ data });
  }
}
