import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    createUser(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.createUser(registerUserDto);
    }

}
