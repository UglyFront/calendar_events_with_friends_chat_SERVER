import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    sender: number

    @Column()
    chatid: string

    @Column()
    text: string

    @Column()
    time: string

    @Column()
    audio: string
}