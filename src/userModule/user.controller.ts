import { Body,Param, Controller, Get, Post, Put, Query, Redirect, UploadedFile, UseInterceptors, UsePipes, ValidationPipe,  } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CheckCodeDTO, QueryParamsLinkActivateDTO, UpdateImgDTO, UpdateNameDTO, UpdatePasswordDTO, UpdateStatusTextDTO } from "src/dto/updateUser.dto";
import { UserEntity } from "src/entity/user.entity";
import { UserServices } from "./user.servicves";


@Controller("/user")
export class UserController {
    constructor(private readonly userServices: UserServices){}

    @Post("/img")
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('img', {
        dest: "./static"
    }))
    updateImg(@Body() body: UpdateImgDTO, @UploadedFile() img: Express.Multer.File): Promise<UserEntity>  {
        console.log(img)
        return this.userServices.updateImg(body, img.filename)
    }

    @Put("/status_text")
    @UsePipes(ValidationPipe)
    updateStatus(@Body() body: UpdateStatusTextDTO): Promise<UserEntity> {
        return this.userServices.updateStatus(body)
    }

    @Put("/name")
    @UsePipes(ValidationPipe)
    updateName(@Body() body: UpdateNameDTO): Promise<UserEntity> {
        return this.userServices.updateName(body)
    }


    @Put("/password")
    @UsePipes(ValidationPipe)
    updatePassword(@Body() body: UpdatePasswordDTO) {
        return this.userServices.updatePassword(body)
    }


    @Put("/check_code")
    @UsePipes(ValidationPipe)
    checkCode(@Body() body: CheckCodeDTO) {
        return this.userServices.checkCode(body)
    }


    @Get("/link_check_code")
    @UsePipes(ValidationPipe)
    checkCodeLink(@Query() q: QueryParamsLinkActivateDTO) {
        return this.userServices.checkCodeLink(q)
    }


    @Get("/:id/:idUser")
    getUserInfo(@Param() {id, idUser}) {
        return this.userServices.getUserInfo(id, idUser)
    }
}