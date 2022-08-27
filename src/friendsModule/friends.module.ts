import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendsEntity } from "src/entity/friends.entity";
import { UserEntity } from "src/entity/user.entity";
import { FriendsController } from "./friends.controller";
import { FriendsServices } from "./friends.services";




@Module({
    controllers: [FriendsController],
    imports: [TypeOrmModule.forFeature([FriendsEntity, UserEntity])],
    providers: [FriendsServices]
})


export class FriendsModule {}