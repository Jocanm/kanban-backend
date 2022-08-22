import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Board } from "src/board/entities/board.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    fullname: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { select: false })
    password: string

    @OneToMany(type => Board, board => board.user)
    boards: Board[]

    @BeforeInsert()
    checkEmailAndPassword() {
        this.email = this.email.toLowerCase().trim()
        this.password = bcrypt.hashSync(this.password, 10)
    }

}