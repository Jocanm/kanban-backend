import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    create(createTaskDto: CreateTaskDto) {
        return 'This action adds a new task';
    }
}
