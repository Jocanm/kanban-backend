import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

const loggerInstance = new Logger('AuthService');

@Injectable()
export class AuthService {

    private readonly logger = loggerInstance;

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    async createUser(registerUserDto: RegisterUserDto) {

        try {
            const user = this.userRepository.create(registerUserDto);
            const {password, ...userCreated} = await this.userRepository.save(user);

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

    private generateJwt(payload: JwtPayload){
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
