import { LoginDTO, RegistrationDTO } from "src/dto/auth.dto";
import { UserEntity } from "src/entity/user.entity";
import { RegistrationServices } from "./registration.services";
export declare class RegistrationController {
    private readonly registrationServices;
    constructor(registrationServices: RegistrationServices);
    registration(body: RegistrationDTO): Promise<UserEntity[]>;
    login(body: LoginDTO): Promise<UserEntity[]>;
}
