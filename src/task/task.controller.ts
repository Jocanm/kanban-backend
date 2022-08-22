import { Body, Controller, Param, Post, ParseUUIDPipe, Delete } from '@nestjs/common';
import { Auth } from '../auth/decorators';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post(':id')
    @Auth()
    create(
        @Param('id', ParseUUIDPipe) stateId: string,
        @Body() createTaskDto: CreateTaskDto,
    ) {
        return this.taskService.create(createTaskDto, stateId);
    }

    @Delete(':id')
    @Auth()
    delete(
        @Param('id', ParseUUIDPipe) taskId: string,
    ) {
        return this.taskService.delete(taskId);
    }

}
