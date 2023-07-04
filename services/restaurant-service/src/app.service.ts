import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { CreateCategoryProductDto } from './dto/createCategoryProduct.dto';
import { UpdateCategoryProductDto } from './dto/updateCategoryProduct.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) { }
  create(data: CreateRestaurantDto) {
    return this.prismaService.restaurant.create({ data });
  }

  getById(id: string) {
    return this.prismaService.restaurant.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  getByUserId(id: string) {
    return this.prismaService.restaurant.findMany({
      where: { ownerId: id },
      include: {
        products: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  getRestaurant() {
    return this.prismaService.restaurant.findMany();
  }

  createProduct(data: CreateProductDto) {
    return this.prismaService.product.create({ data });
  }

  getProducts() {
    return this.prismaService.product.findMany({
      include: {
        category: true,
      },
    });
  }

  getProductById(id: string) {
    return this.prismaService.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  deleteProduct(id: string) {
    return this.prismaService.product.delete({
      where: { id },
    });
  }

  createCategoryProduct(data: CreateCategoryProductDto) {
    return this.prismaService.category.create({ data });
  }

  getCategoryProduct() {
    return this.prismaService.category.findMany({
      include: {
        products: true,
      },
    });
  }

  getCategoryProductById(id: string) {
    return this.prismaService.category.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
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
