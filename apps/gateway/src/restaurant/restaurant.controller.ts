import { Controller, Get, Inject, Post, Body, Param, ParseUUIDPipe, Put, Request, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dto/createProduct.dto';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { UpdateRestaurantDto } from './dto/updateRestaurant.dto';
import { CreateCategoryProductDto } from './dto/createCategoryProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { UpdateCategoryProductDto } from './dto/updateCategoryProduct.dto';
import { Observable } from 'rxjs';
import { Roles } from 'src/auth/auth.decorator';
@Controller('restaurant')
export class RestaurantController {
  constructor(
    @Inject('RESTAURANT_SERVICE') private readonly client: ClientProxy,
  ) { }

  @Post('create')
  create(@Body() data: CreateRestaurantDto) {
    return this.client.send('restaurant-service:create', data);
  }

  @Roles('CHIEF')
  @Put('update/:id')
  update(@Param("id", ParseUUIDPipe) id: string, @Body() data: UpdateRestaurantDto) {
    return this.client.send('restaurant-service:update', { id, ...data });
  }

  @Get()
  getRestaurant() {
    return this.client.send('restaurant-service:get', {});
  }

  @Roles('ADMIN')
  @Get('getByUserId/:id')
  getByUserId(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('restaurant-service:getByUserId', id);
  }

  @Roles('CHIEF')
  @Get('getMyRestaurants')
  getMyRestaurant(@Request() req) {
    return this.client.send('restaurant-service:getByUserId', req.user.sub);
  }

  @Roles('CHIEF')
  @Delete('delete/:id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('restaurant-service:delete', id);
  }

  @Post('products')
  createProduct(@Body() data: CreateProductDto) {
    return this.client.send('restaurant-service:createProduct', data);
  }
  
  @Get('products')
  getProducts() {
    return this.client.send('restaurant-service:getProducts', {});
  }

  @Get('products/:id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('restaurant-service:getProductById', id);
  }

  @Put('products/:id')
  updateProduct(@Param("id", ParseUUIDPipe) id: string, @Body() data: UpdateProductDto) {
    return this.client.send('restaurant-service:updateProduct', { id, ...data });
  }

  @Delete('products/:id')
  deleteProduct(@Param("id", ParseUUIDPipe) id: string) {
    return this.client.send('restaurant-service:deleteProduct', id);
  }

  @Post('categories')
  createCategoryProduct(@Body() data: CreateCategoryProductDto) {
    return this.client.send('restaurant-service:createCategoryProduct', data);
  }

  @Get('categories')
  getCategoriesProduct() {
    return this.client.send('restaurant-service:getCategoriesProduct', {});
  }

  @Get('categories/:id')
  getCategoryProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('restaurant-service:getCategoryProductById', id);
  }

  @Put('categories/:id')
  updateCategoryProduct(@Param("id", ParseUUIDPipe) id: string, @Body() data: UpdateCategoryProductDto) {
    return this.client.send('restaurant-service:updateCategoryProduct', { id, ...data });
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('restaurant-service:getById', id);
  }



}
