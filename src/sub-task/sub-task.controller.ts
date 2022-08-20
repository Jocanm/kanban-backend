import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';

@Controller('sub-task')
export class SubTaskController {
    constructor(private readonly subTaskService: SubTaskService) { }

    @Post()
    create(@Body() createSubTaskDto: CreateSubTaskDto) {
        return this.subTaskService.create(createSubTaskDto);
    }
}
