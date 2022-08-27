import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class InviteEventEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    idEvent: number

    @Column()
    idUser: number
}