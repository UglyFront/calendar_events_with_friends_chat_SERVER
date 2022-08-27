import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    ownerId: number

    @Column()
    color: string

    @Column()
    timestart: string

    @Column()
    timeend: string

    @Column()
    date: string
}