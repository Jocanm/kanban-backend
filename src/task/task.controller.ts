import { Body, Controller, Param, Post, ParseUUIDPipe, Delete, Put } from '@nestjs/common';
import { Auth } from '../auth/decorators';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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

    @Put(':id')
    @Auth()
    update(
        @Param('id', ParseUUIDPipe) taskId: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return this.taskService.update(taskId, updateTaskDto);
    }

}
