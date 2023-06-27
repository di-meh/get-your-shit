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
    @Inject('DEMAND_SERVICE') private readonly client: ClientProxy,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post()
  async create(@Body() createDemandDto: CreateDemandDto) {
    const userData = {
      email: createDemandDto.email,
      password: createDemandDto.password,
      username: createDemandDto.username,
    };
    const user = await this.authService.register(userData, ROLE.CHIEF);
    if (!user) {
      throw new InternalServerErrorException('User could not be created');
    }
    const demandData = {
      userId: user.id,
      ...createDemandDto,
    };
    delete demandData.username;
    delete demandData.password;

    return this.client.send('demand-service:restaurant:create', demandData);
  }

  @Roles('ADMIN')
  @Get()
  async getAll() {
    return this.client.send('demand-service:restaurant:getAll', {});
  }

  @Roles('ADMIN')
  @Put(':id/accept')
  async accept(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const response = await lastValueFrom(
      this.client
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

    return { response };
  }

  @Roles('ADMIN')
  @Put(':id/reject')
  async reject(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const response = await lastValueFrom(
      this.client
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
