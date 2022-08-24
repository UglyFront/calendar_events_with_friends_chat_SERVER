import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from 'diagnostics_channel';
import { ChatsUserEntity } from 'src/entity/chats.entity';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatsUserEntity])],
  controllers: [ChatsController],
  providers: [ChatsService]
})
export class ChatsModule {}
