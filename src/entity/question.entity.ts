import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {User} from "./user.entity";
import {Answer} from "./answer.entity";

@Entity('questions')
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @ManyToOne(() => User, (user) => user.questions)
    user: User

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[]
}