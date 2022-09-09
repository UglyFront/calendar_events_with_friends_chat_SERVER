import { Controller, Get, Param, Post, Body, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MessageServices } from "./message.service";




@Controller("/msg")
export class MessageController {
    constructor(private readonly messageService: MessageServices) {}

    @Get("/:chatId")
    getMessage(@Param() {chatId}) {
        return this.messageService.getMessageChat(chatId)
    }


    @Post("/voice")
    @UseInterceptors(FileInterceptor('audio', {
        dest: "./static"
    }))
    createVoiceMsg(@Body() body, @UploadedFile() audio: Express.Multer.File) {
        console.log(audio)
        return this.messageService.createVoiceMsg(body, audio.filename)
    }
}