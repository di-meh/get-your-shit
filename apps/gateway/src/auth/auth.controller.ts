import {Body, Controller, Get, Request, Post, Param} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { Public } from './auth.decorator';
import {VerifyEmailDto} from "./dto/verifyEmail.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('verify')
  verify(@Body() data: VerifyEmailDto) {
    return this.authService.verify(data.hash);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
