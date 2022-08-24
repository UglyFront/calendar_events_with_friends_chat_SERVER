import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


  @Cron('1 * * * * *')
  handleCron() {
    console.log("Тест крона in service app")
  }
}
