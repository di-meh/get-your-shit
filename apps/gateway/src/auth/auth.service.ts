import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async register(registerDto: RegisterUserDto, role: ROLE = ROLE.USER) {
    const { username, password, email } = registerDto;
    const existingUser = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prismaService.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        role,
      },
    });
  }

  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch || !user.verified) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async verify() {
    return this.mailerService
        .sendMail({
          to: 'mahewit638@fitwl.com', // list of receivers
          subject: 'Testing Nest MailerModule ✔', // Subject line
          text: 'welcome', // plaintext body
          html: '<b>welcome</b>', // HTML body content
        })
        .then(() => 'ok')
        .catch((error) => error);
  }

}
