import { User } from "src/auth/entities/user.entity";
import { State } from "src/state/entities/state.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @ManyToOne(
        type => User,
        user => user.boards,
    )
    user: User;

    @OneToMany(
        () => State,
        state => state.board,
        { eager: true }
    )
    states: State[];

}
