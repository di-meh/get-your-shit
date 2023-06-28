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
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";
import * as crypto from 'crypto';
import {MailService} from "../mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly mailService: MailService
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
    const verifyHash = crypto.createHash('sha256').update(randomStringGenerator()).digest('hex');

    const user = await this.prismaService.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        role,
        verifyHash
      },
    });

    await this.mailService.sendSignUpMail({
        to: email,
        data: {
          hash: verifyHash
        }
    });
    return user;
  }

  async verify(hash: string) {
    const user = await this.prismaService.user.findUnique({
        where: {
            verifyHash: hash
        }
    });
    if (!user) {
        throw new NotFoundException('User not found');
    }
    return await this.prismaService.user.update({
        where: {
            id: user.id
        },
        data: {
          verified: true,
          verifyHash: null
        }
    })
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
  // async verify() {
  //   return this.mailerService
  //       .sendMail({
  //         to: 'mahewit638@fitwl.com', // list of receivers
  //         subject: 'Testing Nest MailerModule ✔', // Subject line
  //         text: 'welcome', // plaintext body
  //         html: '<b>welcome</b>', // HTML body content
  //       })
  //       .then(() => 'ok')
  //       .catch((error) => error);
  // }

}
