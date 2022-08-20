import { Module } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { SubTaskController } from './sub-task.controller';
import { SubTask } from './entities/sub-task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SubTaskController],
  providers: [SubTaskService],
  imports: [
    TypeOrmModule.forFeature([SubTask])
  ],
})
export class SubTaskModule { }
