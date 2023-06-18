import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Public, Roles } from '../auth/auth.decorator';
import { CreateDemandDto } from './dto/createDemand.dto';
import { AuthService } from '../auth/auth.service';
import { ROLE } from '@prisma/client';

@Controller('demand')
export class DemandController {
  constructor(
    @Inject('DEMAND_SERVICE') private readonly client: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Get('ping')
  ping(): Observable<string> {
    return this.client.send('demand-service:ping', 'demand');
  }

  @Public()
  @Post('create')
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
    // Remove username, password and email from the DTO and add the user id
    const demandData = {
      userId: user.id,
      ...createDemandDto,
    };
    delete demandData.username;
    delete demandData.password;
    delete demandData.email;

    return this.client.send('demand-service:create', demandData);
  }

  @Roles('ADMIN')
  @Get()
  async getAll() {
    return this.client.send('demand-service:getAll', {});
  }
}
