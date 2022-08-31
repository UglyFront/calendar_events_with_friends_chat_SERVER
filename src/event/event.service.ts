import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { deleteEventDTO, eventDTO, leaveOrAddEventDTO } from 'src/dto/event.dto';
import { ChatEventEntity } from 'src/entity/chatsEvent.entity';
import { EventEntity } from 'src/entity/event.entity';
import { InviteEventEntity } from 'src/entity/inviteEvent.entity';
import { UserEntity } from 'src/entity/user.entity';
import { UserOutFromOtherUsers } from 'src/friendsModule/friends.services';
import { Repository } from 'typeorm';



export interface EventOut extends EventEntity {
    invites: Array<UserOutFromOtherUsers>,
}




@Injectable()
export class EventService {
    constructor(
    @InjectRepository(EventEntity) private readonly eventDB: Repository<EventEntity>,
    @InjectRepository(InviteEventEntity) private readonly inviteEventDB: Repository<InviteEventEntity>,
    @InjectRepository(ChatEventEntity) private readonly chatEventDB: Repository<ChatEventEntity>,
    @InjectRepository(UserEntity) private readonly userDB: Repository<UserEntity>,
        ){}


//helpers////////////////////////////////////Promise<Array<InviteEventEntity>>/////////
 async getInvitesUserByEventId(eventId: number) {
    const invitesId = await this.inviteEventDB.find({where: {
        idEvent: eventId
    }})

    const out = []

    for (let i = 0; i < invitesId.length; i++) {
        let el = invitesId[i]
        let obj = await this.getUserForOutByID(el.idUser)
        out.push(obj)
    }

   return out
 }



 
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


////////////////////////////////////////////////////////////////////////////////////

    async createEvent(body: eventDTO): Promise<EventEntity> {
        let event = await this.eventDB.save(body);
        let chat = await this.chatEventDB.save({idEvent: event.id, img: ""})

        console.log(body)

       await this.inviteEventDB.save({
            idEvent: event.id,
            idUser: event.ownerId
        })

        body.inviteUser.forEach(async el => {
            await this.inviteEventDB.save({
                idEvent: event.id,
                idUser: el.id //
            })
        })


        return event
    }


    async getChatsAllUserEvent(id){
        console.log(id, "event")
    }

    async getMyEvent(id): Promise<Array<EventOut>> {
        const out: Array<EventOut> = []

        let eventsId = await this.inviteEventDB.find({where: {
            idUser: id
        }}) // all event when USERID id in INVITES

        let events = []
        for (let i = 0; i < eventsId.length; i++) {
            let event = await this.eventDB.find({where: {
                id: +eventsId[i].idEvent
            }})

           events.push(event[0])
        }// events user


        for(let i = 0; i < events.length; i++) {
            let el: any = events[i]
            console.log(el)
            el.invites = await this.getInvitesUserByEventId(el.id)
            out.push(el)
        }

        console.log(out)

        return out
    }



    async deleteEvent(body: deleteEventDTO) {
        await this.eventDB.delete({id: body.eventId})
        return await this.inviteEventDB.delete({idEvent: body.eventId})
    }   


    async leaveEvent(body: leaveOrAddEventDTO) {
        return await this.inviteEventDB.delete({idEvent: body.eventId, idUser: body.userId})
    }   


    async addEvent(body: leaveOrAddEventDTO) {
        return await this.inviteEventDB.save({idEvent: body.eventId, idUser: body.userId})
    }
}
