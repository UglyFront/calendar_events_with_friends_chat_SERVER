import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";




export class eventDTO {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    date: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsInt()
    ownerId: number

    @IsNotEmpty()
    @IsString()
    color: string

    @IsNotEmpty()
    @IsString()
    timestart: string

    @IsNotEmpty()
    @IsString()
    timeend: string

    @IsNotEmpty()
    @IsArray()
    inviteUser: Array<any>
}



export class deleteEventDTO {
    @IsNotEmpty()
    @IsInt()
    eventId: number
}

export class leaveOrAddEventDTO {
    @IsNotEmpty()
    @IsInt()
    userId: number

    @IsNotEmpty()
    @IsInt()
    eventId: number
}