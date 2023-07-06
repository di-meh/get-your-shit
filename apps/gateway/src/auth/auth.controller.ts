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
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { Public } from './auth.decorator';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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

  @Public()
  @Post('forgot-password')
  forgotPassword(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data.email);
  }

  @Public()
  @Get('reset-password/:hash')
  getResetPassword(@Param('hash') hash: string) {
    return this.authService.getResetPasswordToken(hash);
  }

  @Public()
  @Post('reset-password')
  resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOneById(req.user.sub);
  }

  @Get('user/:id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOneById(id);
  }
}
