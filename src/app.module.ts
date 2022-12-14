import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { StateModule } from './state/state.module';
import { TaskModule } from './task/task.module';
import { SubTaskModule } from './sub-task/sub-task.module';

@Module({
    controllers: [],
    providers: [],
    imports: [

        ConfigModule.forRoot(),

        TypeOrmModule.forRoot({

            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,

            autoLoadEntities: true,
            synchronize: true,

        }),

        AuthModule,

        BoardModule,

        StateModule,

        TaskModule,

        SubTaskModule

    ],
})
export class AppModule { }
