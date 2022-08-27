import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class ChatEventEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    idEvent: number

    @Column()
    img: string
}