import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Console } from "console";
import { UpdateImgDTO, UpdateStatusTextDTO, UpdateNameDTO, UpdatePasswordDTO, CheckCodeDTO, QueryParamsLinkActivateDTO } from "src/dto/updateUser.dto";
import { FriendsEntity } from "src/entity/friends.entity";
import { UserEntity } from "src/entity/user.entity";
import { Repository } from "typeorm";
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt")


const generateRandomCode = (): string => {
    let code = ""
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10)
    }
    return code
}



let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "denpogoda@gmail.com", 
      pass: "usbxrqpkozfyxiom", 
    },
  });



@Injectable()
export class UserServices {
    constructor(
        @InjectRepository(FriendsEntity) private readonly friendDB: Repository<FriendsEntity>,
        @InjectRepository(UserEntity) private readonly userDB: Repository<UserEntity>){}


    async updateImg(dto: UpdateImgDTO, img: string): Promise<UserEntity> { 
        return this.userDB.save({
            id: +dto.id,
            img: img
        });
    }

    async updateStatus(dto: UpdateStatusTextDTO):  Promise<UserEntity> {
        return this.userDB.save({
            id: dto.id,
            statusText: dto.statusText
        });
    }

    async updateName(dto: UpdateNameDTO):  Promise<UserEntity> {
        return this.userDB.save({
            id: dto.id,
            name: dto.name
        });
    }


    async updatePassword(dto: UpdatePasswordDTO): Promise<UserEntity> {
        const code: string = generateRandomCode()

        await this.userDB.save({
            id: dto.id,
            setPassword: dto.newPassword,
            code
        });

        const user = await this.userDB.find({where: {
            id: dto.id
        }})



        try {
            let result = await transporter.sendMail({
                from: 'Update password',
                to: [`denpogoda@gmail.com, ${user[0].email}`],
                subject: 'Update password',
                html:
                  `
                  <h1>${user[0].name} <br/>Ваш код ${user[0].code}</h1>
                  <a href="http://localhost:6600/user/link_check_code?id=${user[0].id}&code=${user[0].code}">*Тык для автоподтверждения*</a>
                  `,
              })
              console.log(result)


              return user[0]
        } catch(e) {
            console.log(e)

            throw new BadRequestException("Ошибка почты...")
        }
    }


    async checkCode(dto: CheckCodeDTO) {
        const user = await this.userDB.find({where: {
            id: dto.id
        }})

        if (user[0].code === dto.code) {
            return await this.userDB.save({
                id: dto.id,
                password: await bcrypt.hash(user[0].setPassword,10),
                setPassword: "",
                code: ""
            })
        } else {
            this.updatePassword({id: dto.id, newPassword: user[0].setPassword})
            throw new BadRequestException("Код не верен, новый код отправлен на почту!")
        }
    }


    async checkCodeLink(dto: QueryParamsLinkActivateDTO) {
        const user = await this.userDB.find({where: {
            id: +dto.id
        }})


        if (!user[0].setPassword) {
            throw new BadRequestException("Код не активен...")
        }

        if (user[0].code === dto.code) {
            return await this.userDB.save({
                id: +dto.id,
                password: await bcrypt.hash(user[0].setPassword,10),
                setPassword: "",
                code: ""
            })
        } else {
            this.updatePassword({id: +dto.id, newPassword: user[0].setPassword})
            throw new BadRequestException("Код не верен, новый код отправлен на почту!")
        }
    }


    async getUserInfo(id, idUser) {
        const friend = await this.friendDB.find({where: {
            id: +id
        }})

        if(friend[0].sender == idUser) {
            var user = await this.userDB.find({where: {
                id: friend[0].reciver
            }})
        } else if (friend[0].reciver == idUser) {
            var user = await this.userDB.find({where: {
                id: friend[0].sender
            }})
        }



        return {
            id: user[0].id,
            name: user[0].name,
            status: user[0].status,
            img: user[0].img
        }
    }
}