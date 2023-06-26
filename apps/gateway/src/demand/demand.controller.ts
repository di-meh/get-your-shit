import {
  Body,
  Controller, ForbiddenException,
  Get,
  Inject,
  InternalServerErrorException, Param, ParseUUIDPipe,
  Post, Put, Request
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {catchError, lastValueFrom, Observable} from 'rxjs';
import { Public, Roles } from '../auth/auth.decorator';
import { CreateDemandDto } from './dto/createDemand.dto';
import { AuthService } from '../auth/auth.service';
import { ROLE } from '@prisma/client';
import {UserService} from "../user/user.service";

@Controller('demand')
export class DemandController {
  constructor(
    @Inject('DEMAND_SERVICE') private readonly client: ClientProxy,
    private readonly authService: AuthService,
    private readonly userService: UserService
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
    const demandData = {
      userId: user.id,
      ...createDemandDto,
    };
    delete demandData.username;
    delete demandData.password;

    return this.client.send('demand-service:create', demandData);
  }

  @Roles('ADMIN')
  @Get()
  async getAll() {
    return this.client.send('demand-service:getAll', {});
  }

  @Roles('ADMIN')
  @Put('accept/:id')
  async accept(@Param('id', ParseUUIDPipe) id: string, @Request() req)
  {
    const response = await lastValueFrom(
        this.client.send('demand-service:accept',
            { id, reviewerId: req.user.sub })
            .pipe(catchError((error) => {
                throw new ForbiddenException(error.message);
            }))
    );

    // // @ts-ignore TODO: Chercher comment faire pour que le type soit bon
    const user = await this.userService.verifyUser(response.userId);
    if (!user) {
      throw new InternalServerErrorException('User could not be verified');
    }

    return {response};
  }
}
