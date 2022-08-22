import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UnauthorizedException } from "@nestjs/common";



export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        configService: ConfigService

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate({ id }: JwtPayload) {

        const user = this.userRepo.findOneBy({ id });

        if (!user) {
            throw new UnauthorizedException("Token is not valid");
        }

        return user;

    }

}