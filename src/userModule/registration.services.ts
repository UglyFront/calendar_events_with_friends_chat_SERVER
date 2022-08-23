import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegistrationDTO } from "src/dto/auth.dto";
import { UserEntity } from "src/entity/user.entity";
import { Repository } from "typeorm";
const bcrypt = require('bcrypt');


@Injectable()
export class RegistrationServices {
    constructor(@InjectRepository(UserEntity) private readonly userDB: Repository<UserEntity>){}


   async registration(dto): Promise<UserEntity[]> {
    const candidate: UserEntity[] = await this.userDB.find({where: {
        login: dto.login
    }})

    if(!candidate.length) {
        dto.password = await bcrypt.hash(dto.password, 10)
        console.log(dto.password)
        const created: UserEntity[] = await this.userDB.save(dto)
        return created
    } else {
        throw new BadRequestException("Не уникален логин")
    }


   }

   async login(dto): Promise<UserEntity[]> {
     const candidate: UserEntity[] = await this.userDB.find({where: {
        login: dto.login,
     }})

     if (!candidate.length) {
        throw new BadRequestException("Не верен логин или пароль")
     } else {
       const checkPassword = await bcrypt.compare(dto.password, candidate[0].password);

       if (checkPassword) {
        return candidate
       } else {
        throw new BadRequestException("Не верен логин или пароль")
       }
     }
    }
}