import { Controller, Get, Param, Post, Body, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MessageServices } from "./message.service";

let c = 0



@Controller("/msg")
export class MessageController {
    constructor(private readonly messageService: MessageServices) {}

    @Get("/:chatId")
    getMessage(@Param() {chatId}) {
        c += 1
        console.log(c)
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

    //dto write
    @Post("/file")
    @UseInterceptors(FileInterceptor('file', {
        dest: "./static"
    }))
    fileMsg(@UploadedFile() file: Express.Multer.File, @Body() body) {
        return this.messageService.createFile(body, file.filename)
    }   
}