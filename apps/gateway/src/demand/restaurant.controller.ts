import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { Public, Roles } from '../auth/auth.decorator';
import { CreateDemandDto } from './dto/createDemand.dto';
import { AuthService } from '../auth/auth.service';
import { ROLE } from '@prisma/client';
import { UserService } from '../user/user.service';

@Controller('demand/restaurant')
export class RestaurantDemandController {
  constructor(
    @Inject('DEMAND_SERVICE') private readonly demandClient: ClientProxy,
    @Inject('RESTAURANT_SERVICE')
    private readonly restaurantClient: ClientProxy,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post()
  async create(@Body() createDemandDto: CreateDemandDto) {
    const user = await this.authService.register(createDemandDto, ROLE.CHIEF);
    if (!user) {
      throw new InternalServerErrorException('User could not be created');
    }
    const demandData = {
      userId: user.id,
      ...createDemandDto,
    };
    delete demandData.username;
    delete demandData.password;

    return this.demandClient.send(
      'demand-service:restaurant:create',
      demandData,
    );
  }

  @Roles('ADMIN')
  @Get()
  async getAll() {
    return this.demandClient.send('demand-service:restaurant:getAll', {});
  }

  @Roles('ADMIN')
  @Put(':id/accept')
  async accept(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const response = await lastValueFrom(
      this.demandClient
        .send('demand-service:restaurant:accept', {
          id,
          reviewerId: req.user.sub,
        })
        .pipe(
          catchError((error) => {
            throw new InternalServerErrorException(error.message);
          }),
        ),
    );

    // // @ts-ignore TODO: Chercher comment faire pour que le type soit bon
    const user = await this.userService.verifyUser(response.userId);
    if (!user) {
      throw new InternalServerErrorException('User could not be verified');
    }

    const restaurantData = {
      name: response.name,
      address: response.address,
      phone: response.phone,
      postal_code: response.postal_code,
      city: response.city,
      ownerId: response.userId,
    };
    const restaurantResponse = await lastValueFrom(
      this.restaurantClient
        .send('restaurant-service:create', restaurantData)
        .pipe(
          catchError((error) => {
            throw new InternalServerErrorException(error.message);
          }),
        ),
    );
    if (!restaurantResponse) {
      throw new InternalServerErrorException('Restaurant could not be created');
    }

    return { response, restaurantResponse };
  }

  @Roles('ADMIN')
  @Put(':id/reject')
  async reject(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const response = await lastValueFrom(
      this.demandClient
        .send('demand-service:restaurant:reject', {
          id,
          reviewerId: req.user.sub,
        })
        .pipe(
          catchError((error) => {
            throw new InternalServerErrorException(error.message);
          }),
        ),
    );

    // // @ts-ignore TODO: Chercher comment faire pour que le type soit bon
    const user = await this.userService.verifyUser(response.userId);
    if (!user) {
      throw new InternalServerErrorException('User could not be verified');
    }

    return { response };
  }
}
