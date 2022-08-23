import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './userModule/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from './entity/user.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: '109109109',
    database: 'calendar',
    synchronize: true,
    host: "localhost",
    entities: [UserEntity]
   }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
