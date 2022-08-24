import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './userModule/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from './entity/user.entity';
import { FriendsEntity } from './entity/friends.entity';
import { FriendsModule } from './friendsModule/friends.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ChatsModule } from './chats/chats.module';
import * as path from "path"
import { ChatsUserEntity } from './entity/chats.entity';

@Module({
  imports: [ScheduleModule.forRoot(), ServeStaticModule.forRoot({
    rootPath: path.resolve(__dirname, "..", 'static'),
  }) ,UserModule, FriendsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: '109109109',
    database: 'calendar',
    synchronize: true,
    host: "localhost",
    entities: [UserEntity, FriendsEntity, ChatsUserEntity]
   }), ChatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
