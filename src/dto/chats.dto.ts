import { IsInt, IsNotEmpty, IsString } from "class-validator";



export class chatsUserDTO {
    @IsNotEmpty()
    @IsInt()
    userOne: number

    @IsNotEmpty()
    @IsInt()
    userTwo: number
}


export class myChatsDTO {
    @IsNotEmpty()
    @IsString()
    id: string
}