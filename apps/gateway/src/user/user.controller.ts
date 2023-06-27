import { Body, Controller, Get, Request, Post, Put } from '@nestjs/common';
import { addPaymentDto } from './dto/addPayment.dto';
import { UserService } from './user.service';



@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Put('payment/add')
    addPayment(@Request() req, @Body() paymentInfo: addPaymentDto) {
        return this.userService.addPayment(req.user.sub, paymentInfo.customerId);
    }

}