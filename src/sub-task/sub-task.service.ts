import { Injectable } from '@nestjs/common';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';

@Injectable()
export class SubTaskService {
    create(createSubTaskDto: CreateSubTaskDto) {
        return 'This action adds a new subTask';
    }
}
