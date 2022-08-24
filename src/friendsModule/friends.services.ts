import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FriendsDTO } from "src/dto/friends.dto";
import { FriendsEntity, statusFriends } from "src/entity/friends.entity";
import { Repository } from "typeorm";




@Injectable()
export class FriendsServices {
    constructor(@InjectRepository(FriendsEntity) private readonly friendsDB: Repository<FriendsEntity>) {}

   async getFriends(id): Promise<Array<FriendsEntity>> {
        return await this.friendsDB.find({where: [
            {sender: id, status: statusFriends.ACCEPT},
            {reciver: id, status: statusFriends.ACCEPT}
        ]})
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
}