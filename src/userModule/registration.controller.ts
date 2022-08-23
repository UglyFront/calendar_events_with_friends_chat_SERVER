import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { LoginDTO, RegistrationDTO } from "src/dto/auth.dto";
import { UserEntity } from "src/entity/user.entity";
import { RegistrationServices } from "./registration.services";




@Controller("/auth")
export class RegistrationController {
    constructor(private readonly registrationServices: RegistrationServices){}

    @Post("/registration")
    @UsePipes(ValidationPipe)
    registration(@Body() body: RegistrationDTO): Promise<UserEntity[]> {
        return this.registrationServices.registration(body)
    }


    @Post("/login")
    @UsePipes(ValidationPipe)
    login(@Body() body: LoginDTO): Promise<UserEntity[]> {
        return this.registrationServices.login(body)

    }
}