export declare enum statusEnum {
    ONLINE = "Online",
    OFFLINE = "Offline"
}
export declare class UserEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    login: string;
    img: string;
    statusText: string;
    status: statusEnum;
    setPassword: string;
    code: string;
}
