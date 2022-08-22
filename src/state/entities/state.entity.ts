import { Board } from "src/board/entities/board.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class State {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @ManyToOne(
        type => Board,
        board => board.states,
        { onDelete: 'CASCADE' }
    )
    board: Board;

    @OneToMany(type => Task, task => task.state)
    tasks: Task[];

}
