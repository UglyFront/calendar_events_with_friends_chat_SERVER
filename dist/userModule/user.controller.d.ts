import { CheckCodeDTO, UpdateImgDTO, UpdateNameDTO, UpdatePasswordDTO, UpdateStatusTextDTO } from "src/dto/update.dto";
import { UserEntity } from "src/entity/user.entity";
import { UserServices } from "./user.servicves";
export declare class UserController {
    private readonly userServices;
    constructor(userServices: UserServices);
    updateImg(body: UpdateImgDTO): Promise<UserEntity>;
    updateStatus(body: UpdateStatusTextDTO): Promise<UserEntity>;
    updateName(body: UpdateNameDTO): Promise<UserEntity>;
    updatePassword(body: UpdatePasswordDTO): Promise<UserEntity>;
    checkCode(body: CheckCodeDTO): Promise<{
        id: number;
        password: any;
        setPassword: string;
        code: string;
    } & UserEntity>;
}
