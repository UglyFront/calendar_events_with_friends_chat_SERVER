import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


export enum statusFriends {
    CLOSE = "CLOSE",
    SEND = "SEND",
    ACCEPT = "ACCEPT"
}

@Entity()
export class FriendsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    reciver: number

    @Column()
    sender: number

    @Column({default: statusFriends.SEND})
    status: statusFriends

}