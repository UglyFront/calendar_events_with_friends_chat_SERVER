import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class ChatsUserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userOne: number

    @Column()
    userTwo: number
}