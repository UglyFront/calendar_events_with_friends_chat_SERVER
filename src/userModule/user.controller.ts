import { Body, Controller, Get, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CheckCodeDTO, UpdateImgDTO, UpdateNameDTO, UpdatePasswordDTO, UpdateStatusTextDTO } from "src/dto/update.dto";
import { UserEntity } from "src/entity/user.entity";
import { UserServices } from "./user.servicves";




@Controller("/user")
export class UserController {
    constructor(private readonly userServices: UserServices){}

    @Put("/img")
    @UsePipes(ValidationPipe)
    updateImg(@Body() body: UpdateImgDTO): Promise<UserEntity> {
        return this.userServices.updateImg(body)
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
}