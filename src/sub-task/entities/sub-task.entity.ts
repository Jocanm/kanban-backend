import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from '../../task/entities/task.entity';

@Entity()
export class SubTask {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('bool', { default: false })
    done: boolean;

    @ManyToOne(type => Task, task => task.subTasks)
    task: Task;

}
