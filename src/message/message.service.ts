import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "src/entity/message.entity";
import { UserEntity } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { brotliDecompress } from "zlib";




@Injectable()
export class MessageServices {
    constructor(
    @InjectRepository(MessageEntity) private readonly messageDB: Repository<MessageEntity>,
    @InjectRepository(UserEntity) private readonly userDB: Repository<UserEntity>
    ) {}

    async getMessageChat(chatId): Promise<any> {
        
    const allMessage = await this.messageDB.find({where: {
        chatid: chatId
    }})

    const out = []

    for (let i = 0; i < allMessage.length; i++) {
        let el: any = allMessage[i]

        let userSender = await this.userDB.find({where: {
            id: el.sender
        }})

        el.user = { 
            id: userSender[0].id,
            name: userSender[0].name,
            img: userSender[0].img
        }

        out.push(el)
    }

    return out
    }


    //описать дто : Promise<MessageEntity>
    async createVoiceMsg (body, audio) {
        let addMessage = await this.messageDB.save({
            audio: audio,
            chatid: body.chatid,
            sender: body.sender,
            text: "",
            time: body.time
        })

        console.log(addMessage)

        return addMessage
    }


    async createFile(body, file) {
        let addMessage = await this.messageDB.save({
            audio: "",
            chatid: body.chatid,
            sender: body.sender,
            text: "",
            time: body.time,
            src: file,
            typeFile: body.typeFile
        })

        console.log(addMessage)

        return addMessage
    }
}