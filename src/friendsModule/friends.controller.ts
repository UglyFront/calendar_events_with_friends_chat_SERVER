import { Controller, Get, Param, Post, Put, Body, UsePipes, ValidationPipe, Delete } from "@nestjs/common";
import { FriendsDTO } from "src/dto/friends.dto";
import { FriendsEntity } from "src/entity/friends.entity";
import { FriendsServices } from "./friends.services";




@Controller("/friends")
export class FriendsController {
    constructor(private readonly friendsServices: FriendsServices) {}

    @Get("/:id")
    getFriends(@Param() {id}): Promise<Array<FriendsEntity>> {
        return this.friendsServices.getFriends(id)
    }


    @Get("sender/:id")
    getISender(@Param() {id}): Promise<Array<FriendsEntity>> {
        return this.friendsServices.getISender(id)
    }

    @Get("reciver/:id")
    getIReciver(@Param() {id}): Promise<Array<FriendsEntity>> {
        return this.friendsServices.getIReciver(id)
    }


    @Post()
    @UsePipes(ValidationPipe)
    createFriend(@Body() body: FriendsDTO) {
        return this.friendsServices.createFriend(body)
    }

    
    @Delete("/delete")
    @UsePipes(ValidationPipe)
    deleteSendFriends(@Body() body: FriendsDTO) {
        return this.friendsServices.deleteSendFriends(body)
    }

    @Put("/accept")
    @UsePipes(ValidationPipe)
    acceptFriends(@Body() body: FriendsDTO) {
        return this.friendsServices.acceptFriends(body)
    }
}