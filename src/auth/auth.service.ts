import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto, RegisterUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { BoardService } from '../board/board.service';

const loggerInstance = new Logger('AuthService');

@Injectable()
export class AuthService {

    private readonly logger = loggerInstance;

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly boardService: BoardService
    ) { }

    async createUser(registerUserDto: RegisterUserDto) {

        try {
            const user = this.userRepository.create(registerUserDto);
            const { password, ...userCreated } = await this.userRepository.save(user);

            await this.boardService.create({
                title: 'Default Board',
                states: ['TODO', 'DOING', 'DONE'],
            }, userCreated.id);

            const token = this.generateJwt({
                id: user.id,
            })

            return {
                ...userCreated,
                token
            }

        } catch (error) {
            this.handleDbError(error);
        }

    }

    async login(loginUserDto: LoginUserDto) {

        const { email, password } = loginUserDto;


        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'fullname']
        });

        if (!user || (!bcrypt.compareSync(password, user?.password))) {
            throw new BadRequestException('Invalid credentials');
        }

        const token = this.generateJwt({
            id: user.id,
        })

        delete user.password;

        return {
            ...user,
            token
        }

    }

    validateToken(user: User) {
        return {
            ...user,
            token: this.generateJwt({
                id: user.id,
            })
        }
    }

    private generateJwt(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    private handleDbError(error: any) {

        const { code } = error;

        this.logger.error(error);

        if (code === '23505') {
            throw new BadRequestException(error.detail);
        }

        throw new InternalServerErrorException("Please check server logs");

    }

}
