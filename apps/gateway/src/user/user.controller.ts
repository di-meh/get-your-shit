import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Put,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { addPaymentDto } from './dto/addPayment.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('payment/add')
  addPayment(@Request() req, @Body() paymentInfo: addPaymentDto) {
    return this.userService.addPayment(req.user.sub, paymentInfo.customerId);
  }

  @Put('/me')
  update(@Request() req, @Body() userInfo: UpdateUserDto) {
    return this.userService.updateMe(req.user.sub, userInfo);
  }

  @Get('/me')
  getMe(@Request() req) {
    return this.userService.getMe(req.user.sub);
  }
}
