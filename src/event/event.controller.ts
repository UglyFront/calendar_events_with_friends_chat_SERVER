import { Controller, Get, Param, Post, Body, UsePipes, ValidationPipe, Delete, Put } from '@nestjs/common';
import { deleteEventDTO, eventDTO, leaveOrAddEventDTO } from 'src/dto/event.dto';
import { EventEntity } from 'src/entity/event.entity';
import { InviteEventEntity } from 'src/entity/inviteEvent.entity';
import { EventOut, EventService } from './event.service';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService){}

    @Get("/chats_event/:id")
    getChatsAllUserEvent(@Param() {id}) {
        return this.eventService.getChatsAllUserEvent(id)
    }

    @Put("/check_chat")
    checkEventInUser(@Body() body) {
        return this.eventService.checkEventInUser(body)
    }
    
    @Get("/:id")
    getMyEvent(@Param() {id}): Promise<Array<EventOut>> {
        return this.eventService.getMyEvent(id)
    }


    @Get("/current/:id")
    getCurrentEvent(@Param() {id}): Promise<any> {
        return this.eventService.getCurrentEvent(id)
    }


    @Post("")
    @UsePipes(ValidationPipe)
    createEvent(@Body() body: eventDTO): Promise<EventEntity> {
        return this.eventService.createEvent(body)
    }




    @Delete("/")
    @UsePipes(ValidationPipe)
    deleteEvent(@Body() body: deleteEventDTO) {
        return this.eventService.deleteEvent(body)
    }

    @Delete("/leave")
    @UsePipes(ValidationPipe)
    leaveEvent(@Body() body: leaveOrAddEventDTO) {
        return this.eventService.leaveEvent(body)
    }


    @Put("/")
    @UsePipes(ValidationPipe)
    addEvent(@Body() body: leaveOrAddEventDTO) {
        return this.eventService.addEvent(body)
    }
}
