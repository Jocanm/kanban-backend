import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { State } from './entities/state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [StateController],
  providers: [StateService],
  imports: [
    TypeOrmModule.forFeature([State])
  ],
  exports: [TypeOrmModule]
})
export class StateModule { }
