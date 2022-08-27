import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


  // @Cron('1 * * * * *')
  // handleCron() {
  //   console.log("Тест крона in service app")
  // }

}
