import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { CreateCategoryProductDto } from './dto/createCategoryProduct.dto';
import { UpdateCategoryProductDto } from './dto/updateCategoryProduct.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  create(data: CreateRestaurantDto) {
    return this.prismaService.restaurant.create({ data });
  }

  getRestaurant() {
    return this.prismaService.restaurant.findMany();
  }

  createProduct(data: CreateProductDto) {
    return this.prismaService.product.create({ data });
  }

  getProducts() {
    return this.prismaService.product.findMany();
  }

  createCategoryProduct(data: CreateCategoryProductDto) {
    return this.prismaService.category.create({ data });
  }

  getCategoryProduct() {
    return this.prismaService.category.findMany();
  }

  updateProduct(data: UpdateProductDto) {
    const { id, ...rest } = data;
    return this.prismaService.product.update({
      where: { id },
      data: rest,
    });
  }

  updateCategoryProduct(data: UpdateCategoryProductDto) {
    const { id, ...rest } = data;
    return this.prismaService.category.update({
      where: { id },
      data: rest,
    });
  }



}
