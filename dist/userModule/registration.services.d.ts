import { UserEntity } from "src/entity/user.entity";
import { Repository } from "typeorm";
export declare class RegistrationServices {
    private readonly userDB;
    constructor(userDB: Repository<UserEntity>);
    registration(dto: any): Promise<UserEntity[]>;
    login(dto: any): Promise<UserEntity[]>;
}
