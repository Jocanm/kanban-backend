import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { State } from '../../state/entities/state.entity';
import { SubTask } from '../../sub-task/entities/sub-task.entity';

@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @ManyToOne(
        type => State, 
        state => state.tasks,
        { onDelete: 'CASCADE' }
    )
    state: State;

    @OneToMany(
        type => SubTask, 
        subTask => subTask.task,
        { eager: true }
    )
    subTasks: SubTask[];

}
