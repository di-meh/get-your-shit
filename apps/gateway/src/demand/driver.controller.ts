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
import { CreateDemandDriverDto } from './dto/CreateDemandDriverDto.dto';
import { AuthService } from '../auth/auth.service';
import { ROLE } from '@prisma/client';
import { UserService } from '../user/user.service';
@Controller('demand/driver')
export class DriverDemandController {
    constructor(
        @Inject('DEMAND_SERVICE') private readonly demandClient: ClientProxy,
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Post()
    async create(@Request() req, @Body() data: CreateDemandDriverDto) {
        const demandData = {
            userId: req.user.sub,
            ...data,
        };
        return this.demandClient.send('demand-service:driver:create', demandData);
    }

    @Roles('ADMIN')
    @Get()
    async getAll() {
        return this.demandClient.send('demand-service:driver:getAll', {});
    }
    @Roles('ADMIN')
    @Get(':id')
    async getOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.demandClient.send('demand-service:driver:getOne', id);
    }
    @Roles('ADMIN')
    @Put(':id/accept')
    async accept(@Request() req, @Param('id', ParseUUIDPipe) id: string) {
        const response = await lastValueFrom(
            this.demandClient.send('demand-service:driver:accept', {
                id,
                reviewerId: req.user.sub,
            })
                .pipe(catchError((error) => {
                    throw new InternalServerErrorException(error.message);
                })),
        );
        const user = await this.userService.updateUser(response.userId, {
            role: ROLE.DELIVERY,
            departement: response.departement,
            vehicule_type: response.vehicule_type,
            date_birth: response.date_birth,
        });
        if (!user) {
            throw new InternalServerErrorException('User could not be updated');
        }
    }
    @Roles('ADMIN')
    @Put(':id/reject')
    async reject(@Request() req, @Param('id', ParseUUIDPipe) id: string) {
        const response = await lastValueFrom(
            this.demandClient.send('demand-service:driver:reject', {
                id,
                reviewerId: req.user.sub,
            })
            .pipe(catchError((error) => {
                    throw new InternalServerErrorException(error.message);
            })),
        );
    }

}
