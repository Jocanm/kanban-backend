import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { SubTaskService } from '../sub-task/sub-task.service';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private taskRepo: Repository<Task>,
        private readonly subTaskService: SubTaskService,
    ) { }

    async create(createTaskDto: CreateTaskDto, stateId: string) {

        try {

            const { subTasks = [], ...taskData } = createTaskDto;

            const task = this.taskRepo.create({
                ...taskData,
                state: { id: stateId },
            });

            const taskCreated = await this.taskRepo.save(task);

            const subTasksCreated = await this.subTaskService.createMany(subTasks, taskCreated.id);

            return {
                ...taskCreated,
                subTasks: subTasksCreated,
            };

        } catch (error) {

            console.log(error);
            throw new InternalServerErrorException("Error creating task");

        }

    }

    async delete(taskId: string) {

        const task = await this.taskRepo.findOneBy({ id: taskId });

        if (!task) { throw new NotFoundException("Task not found") }

        await this.taskRepo.remove(task);

        return {
            message: "Task deleted",
        };

    }
}
