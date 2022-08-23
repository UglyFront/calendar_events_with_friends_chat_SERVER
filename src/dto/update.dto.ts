import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateImgDTO {
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsString()
    img: string
}


export class UpdateStatusTextDTO {
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsString()
    @IsNotEmpty()
    statusText: string
}

export class UpdateNameDTO {
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsString()
    @IsNotEmpty()
    name: string
}


export class UpdatePasswordDTO {
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsString()
    @IsNotEmpty()
    newPassword: string
}


export class CheckCodeDTO {
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsString()
    @IsNotEmpty()
    code: string
}