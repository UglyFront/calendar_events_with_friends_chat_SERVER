import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FriendsDTO } from "src/dto/friends.dto";
import { FriendsEntity, statusFriends } from "src/entity/friends.entity";
import { UserEntity } from "src/entity/user.entity";
import { Like, Repository } from "typeorm";


export type UserOutFromOtherUsers = Omit<UserEntity, "password" |  "email" |  "login" |  "code" |  "setPassword">


export interface FriendsEntityWithUser extends FriendsEntity {
    friend: UserOutFromOtherUsers
}




@Injectable()
export class FriendsServices {
    constructor(@InjectRepository(FriendsEntity) private readonly friendsDB: Repository<FriendsEntity>, @InjectRepository(UserEntity) private readonly userDB: Repository<UserEntity>) {}


    async getUserForOutByID (id: number): Promise<UserOutFromOtherUsers> {

        let user = await this.userDB.find({where: {
            id: id
        }})


        let obj: UserOutFromOtherUsers = {
            id: user[0].id,
            img: user[0].img,
            name: user[0].name,
            status: user[0].status,
            statusText: user[0].statusText
        }

        return obj
    }



   async getFriends(id): Promise<Array<FriendsEntityWithUser>> {
    const out: Array<FriendsEntityWithUser>  = []

    let friendId = await this.friendsDB.find({where: [
            {sender: id, status: statusFriends.ACCEPT},
            {reciver: id, status: statusFriends.ACCEPT}]})

    
    for (let i = 0; i < friendId.length; i++) {
        let obj: any = friendId[i]

        if(obj.reciver === id) {
            obj.friend = await this.getUserForOutByID(obj.sender)
        }
        else {
            obj.friend = await this.getUserForOutByID(obj.reciver)
        }

        out.push(obj)

    }

    return out
    

    }


    async getIReciver (id) {
        return await this.friendsDB.find({where: [
            {reciver: id, status: statusFriends.SEND}
        ]})
    }


    async getISender (id) {
        return await this.friendsDB.find({where: [
            {sender: id, status: statusFriends.SEND}
        ]})
    }


    async createFriend(dto: FriendsDTO) {
        const check = await this.friendsDB.find({where: [{
            sender: dto.sender,
            reciver: dto.reciver
        }, {
            sender: dto.reciver,
            reciver: dto.sender
        }]
    })

        if (!check.length) {
            return await this.friendsDB.save({
                sender: dto.sender,
                reciver: dto.reciver
            })
        }
    }


    async deleteSendFriends(dto: FriendsDTO) {
        const findId = await this.friendsDB.find({where: [{
            sender: dto.sender,
            reciver: dto.reciver
        }, {
            sender: dto.reciver,
            reciver: dto.sender
        }]
    })
        return await this.friendsDB.delete(findId[0].id)
    }


    async acceptFriends(dto: FriendsDTO) {
        const acceptId = await this.friendsDB.find({where: {
            sender: dto.sender,
            reciver: dto.reciver
        }})


        return await this.friendsDB.save({id: acceptId[0].id, status: statusFriends.ACCEPT})
    }


    async searchFriends(s: string) {
        return await this.userDB.find({where: {
            name: Like(`%${s}%`)
        }})
    }
}