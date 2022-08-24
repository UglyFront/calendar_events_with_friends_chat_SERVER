import { IsInt, IsNotEmpty } from "class-validator";



export class FriendsDTO {
    @IsInt()
    @IsNotEmpty()
    sender: number

    @IsInt()
    @IsNotEmpty()
    reciver: number
}