import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendsEntity } from "src/entity/friends.entity";
import { UserEntity } from "src/entity/user.entity";
import { RegistrationController } from "./registration.controller";
import { RegistrationServices } from "./registration.services";
import { UserController } from "./user.controller";
import { UserServices } from "./user.servicves";



@Module({
   imports: [TypeOrmModule.forFeature([UserEntity, FriendsEntity])],
   controllers: [UserController, RegistrationController],
   providers: [UserServices, RegistrationServices]
})
export class UserModule {}
