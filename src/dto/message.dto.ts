import { IsInt, IsNotEmpty, IsString } from "class-validator";



export class messageDTO {
    @IsNotEmpty()
    @IsInt()
    id: number

    @IsNotEmpty()
    @IsInt()
    sender: number

    @IsNotEmpty()
    @IsString()
    chatId: string

    @IsNotEmpty()
    @IsString()
    text: string

    @IsNotEmpty()
    @IsString()
    time: string

    @IsString()
    audio: string
}