import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { StateModule } from '../state/state.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [BoardController],
    providers: [BoardService],
    imports: [
        TypeOrmModule.forFeature([Board]),
        StateModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        // Jwt
        // AuthModule
    ],
    exports: [BoardService]
})
export class BoardModule { }
