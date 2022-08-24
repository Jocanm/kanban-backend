import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SubTaskService } from '../sub-task/sub-task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { SubTask } from '../sub-task/entities/sub-task.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private taskRepo: Repository<Task>,
        private readonly subTaskService: SubTaskService,
        private readonly dataSource: DataSource
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

    async update(taskId: string, updateTaskDto: UpdateTaskDto) {

        const { subTasks, stateId, ...toUpdate } = updateTaskDto;

        const newTask = await this.taskRepo.preload({
            id: taskId,
            ...toUpdate,
            state: { id: stateId },
        });

        if (!newTask) { throw new NotFoundException("Task not found") }

        // Query runner

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            await queryRunner.manager.delete(SubTask, { task: taskId })

            let subTasksToCreate = [];

            subTasks.forEach(task => {

                subTasksToCreate.push(
                    queryRunner.manager.create(SubTask, {
                        task: { id: taskId },
                        title: task.title,
                        done: task.done,
                    })
                )

            })

            await queryRunner.manager.save(subTasksToCreate);

            await queryRunner.manager.save(newTask)
            await queryRunner.commitTransaction();
            await queryRunner.release();

            return {
                ...newTask,
                subTasks: subTasksToCreate,
            };

        } catch (error) {

            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw new InternalServerErrorException("Error updating task");

        }

    }
}
