import {
    BadRequestException,
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
import {ResetPasswordDto} from "./dto/resetPassword.dto";

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

  async forgotPassword(email: string) {
      // TODO: Lint + générer un lien en fonction du rôle
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const resetPasswordHash = crypto.createHash('sha256').update(randomStringGenerator()).digest('hex');
    const forgotPasswordToken = await this.prismaService.forgotPasswordToken.create({
      data: {
        token: resetPasswordHash,
        user: {
            connect: {
                id: user.id
            }
        }
      }
    })
    await this.mailService.sendForgotPasswordMail({
        to: email,
        data: {
            hash: resetPasswordHash
        }
    });

    return {
        message: 'Password reset email sent'
    }

  }

  async resetPassword(data: ResetPasswordDto) {
    const forgotPasswordToken = await this.prismaService.forgotPasswordToken.findUnique({
        where: {
            token: data.hash
        },
        include: {
          user: true
        }
    });
    if (!forgotPasswordToken) {
      throw new NotFoundException('Token not found');
    }
    const user = forgotPasswordToken.user;
    // Check that new password is different from old password
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (passwordMatch) {
        throw new BadRequestException('New password must be different from old password');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await this.prismaService.user.update({
        where: {
            id: user.id
        },
        data: {
            password: hashedPassword
        }
    });
    await this.prismaService.forgotPasswordToken.delete({
        where: {
            id: forgotPasswordToken.id
        }
    });

    return {
        message: 'Password updated'
    }
  }


}
