import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {RegisterUserDto} from "./dto/registerUser.dto";
import {LoginUserDto} from "./dto/loginUser.dto";
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly prismaService: PrismaService, private jwtService: JwtService) {}


    async register(registerDto: RegisterUserDto) {
        const { username, password, email } = registerDto;
        const existingUser = await this.prismaService.user.findUnique({ where: { username } });

        if (existingUser) {
            throw new UnauthorizedException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return await this.prismaService.user.create({
            data: {
                username,
                password: hashedPassword,
                email,
            },
        });
    }

    async login(loginDto: LoginUserDto){
        const { email, password } = loginDto;
        const user = await this.prismaService.user.findUnique({ where: { email } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }


        const payload = { sub: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }




}
