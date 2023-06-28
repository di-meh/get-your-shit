import { Controller, Get, Inject, Post, Body, Put, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dto/createProduct.dto';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { CreateCategoryProductDto } from './dto/createCategoryProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { UpdateCategoryProductDto } from './dto/updateCategoryProduct.dto';
import { Observable } from 'rxjs';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    @Inject('RESTAURANT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('create')
  create(@Body() data: CreateRestaurantDto) {
    return this.client.send('restaurant-service:create', data);
  }

  @Get()
  getRestaurant() {
    return this.client.send('restaurant-service:get', {});
  }

  @Post('products')
  createProduct(@Body() data: CreateProductDto)  {
    return this.client.send('restaurant-service:createProduct', data);
  }

  @Get('products')
  getProducts() {
    return this.client.send('restaurant-service:getProducts', {});
  }

  @Put('products/:id')
  updateProduct(@Param("id", ParseUUIDPipe) id:string, @Body() data: UpdateProductDto) {
    return this.client.send('restaurant-service:updateProduct', {id, ...data});
  }

  @Post('categories')
  createCategoryProduct(@Body() data: CreateCategoryProductDto)  {
    return this.client.send('restaurant-service:createCategoryProduct', data);
  }

  @Get('categories')
  getCategoriesProduct() {
    return this.client.send('restaurant-service:getCategoriesProduct', {});
  }

  @Put('categories/:id')
  updateCategoryProduct(@Param("id", ParseUUIDPipe) id:string, @Body() data: UpdateCategoryProductDto) {
    return this.client.send('restaurant-service:updateCategoryProduct', {id, ...data});
  }
}
