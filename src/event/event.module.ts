import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEventEntity } from 'src/entity/chatsEvent.entity';
import { EventEntity } from 'src/entity/event.entity';
import { FriendsEntity } from 'src/entity/friends.entity';
import { InviteEventEntity } from 'src/entity/inviteEvent.entity';
import { UserEntity } from 'src/entity/user.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [TypeOrmModule.forFeature([EventEntity, FriendsEntity, InviteEventEntity, ChatEventEntity, UserEntity])]
})
export class EventModule {}
