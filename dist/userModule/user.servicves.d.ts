import { UpdateImgDTO, UpdateStatusTextDTO, UpdateNameDTO, UpdatePasswordDTO, CheckCodeDTO } from "src/dto/update.dto";
import { UserEntity } from "src/entity/user.entity";
import { Repository } from "typeorm";
export declare class UserServices {
    private readonly userDB;
    constructor(userDB: Repository<UserEntity>);
    updateImg(dto: UpdateImgDTO): Promise<UserEntity>;
    updateStatus(dto: UpdateStatusTextDTO): Promise<UserEntity>;
    updateName(dto: UpdateNameDTO): Promise<UserEntity>;
    updatePassword(dto: UpdatePasswordDTO): Promise<UserEntity>;
    checkCode(dto: CheckCodeDTO): Promise<{
        id: number;
        password: any;
        setPassword: string;
        code: string;
    } & UserEntity>;
}
