import { from } from "rxjs";
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, OneToOne } from "typeorm";
import { FriendsEntity } from "./friends.entity";


export enum statusEnum {
    ONLINE = "Online",
    OFFLINE = "Offline"
}

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    login: string

    @Column({default: ""})
    img: string

    @Column({default: ""})
    statusText: string

    @Column({default: statusEnum.OFFLINE})
    status: statusEnum

    @Column({default: ""})
    setPassword: string

    @Column({default: ""})
    code: string
}