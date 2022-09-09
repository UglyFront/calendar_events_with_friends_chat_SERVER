import { Body, Controller, Get, Put, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { chatsUserDTO, myChatsDTO } from 'src/dto/chats.dto';
import { leaveOrAddEventDTO } from 'src/dto/event.dto';
import { ChatsUserEntity } from 'src/entity/chats.entity';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
    constructor(private readonly chatsServices: ChatsService){}

    @Post()
    @UsePipes(ValidationPipe)
    createChat(@Body() body: chatsUserDTO): Promise<ChatsUserEntity> {
        return this.chatsServices.createChat(body)
    }


    @Post("/myChats")
    @UsePipes(ValidationPipe)
    getMyChats(@Body() body: myChatsDTO): Promise<ChatsUserEntity[]> {
        return this.chatsServices.getMyChats(body)
    }


    @Get("/:id")
    @UsePipes(ValidationPipe)
    getCurrentChat(@Param() {id}: myChatsDTO): Promise<ChatsUserEntity> {
        console.log(id)
        return this.chatsServices.getCurrentChat(id)
    }
}
