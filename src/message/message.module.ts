import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entity/message.entity';
import { UserEntity } from 'src/entity/user.entity';
import { MessageController } from './message.controller';
import { MessageServices } from './message.service';

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity, UserEntity])],
    controllers: [MessageController],
    providers: [MessageServices]
})
export class MessageModule {}
