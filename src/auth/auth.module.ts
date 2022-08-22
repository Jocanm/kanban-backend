import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],

    exports: [PassportModule, JwtModule, TypeOrmModule, JwtStrategy],

    imports: [

        ConfigModule,

        TypeOrmModule.forFeature([User]),

        PassportModule.register({ defaultStrategy: 'jwt' }),

        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],

            useFactory: async (configService: ConfigService) => {

                const secret = configService.get('JWT_SECRET');
                const expiresIn = configService.get('JWT_EXPIRATION');

                return {
                    secret,
                    signOptions: {
                        expiresIn,
                    }
                }
            }
        })
    ]
})
export class AuthModule { }
