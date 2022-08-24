import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { chatsUserDTO, myChatsDTO } from 'src/dto/chats.dto';
import { ChatsUserEntity } from 'src/entity/chats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
    constructor(@InjectRepository(ChatsUserEntity) private readonly chatsDB: Repository<ChatsUserEntity>){}


    async createChat(dto: chatsUserDTO): Promise<ChatsUserEntity> {
        const candidate = await this.chatsDB.find({where: [
            {
            userOne: dto.userOne,
            userTwo: dto.userTwo
            }
            , 
            {
            userOne: dto.userTwo,
            userTwo: dto.userOne
            }
        ],})


        if (!candidate.length) {
            return this.chatsDB.save({userOne: dto.userOne,
                userTwo: dto.userTwo}
                )
        } else {
            return candidate[0]
        }
    }


    async getMyChats(dto: myChatsDTO): Promise<ChatsUserEntity[]> {
        return await this.chatsDB.find({where: [
            {userOne: +dto.id},
            {userTwo: +dto.id}
        ]})
    }


    async getCurrentChat(dto: string): Promise<ChatsUserEntity> {
        const chat = await this.chatsDB.find({where: {
            id: +dto
        }})

        return chat[0]
    }
}
