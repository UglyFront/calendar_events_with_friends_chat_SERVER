import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateImgDTO {
    @IsNotEmpty()
    @IsString()
    id: string

    // @IsNotEmpty()
    // img: any
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



export class QueryParamsLinkActivateDTO {
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    code: string
}