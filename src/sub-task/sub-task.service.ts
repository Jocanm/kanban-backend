import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { SubTask } from './entities/sub-task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubTaskService {

    constructor(
        @InjectRepository(SubTask)
        private subTaskRepo: Repository<SubTask>,
    ) { }

    async create(createSubTaskDto: CreateSubTaskDto) { }

    async createMany(titles: string[], taskId: string) {

        try {

            const subTasks = titles.map(title => this.subTaskRepo.create({
                title,
                task: { id: taskId }
            }));
            return this.subTaskRepo.save(subTasks);

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Error creating sub tasks");
        }

    }
}
