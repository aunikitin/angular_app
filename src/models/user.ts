import { throwError } from "rxjs";

export default class User {
    id: number;
    login: string = "";
    password: string;
    email: string = "";
    accessLevel: Custom.AccessLevel

    constructor(login, password, email){
        if(login){
            this.login = login;
        }else{
            throwError('Введите логин');
        }
        if(password){
            this.password = password;
        }else{
            throwError('Введите пароль');
        }
        if(email){
            this.email = email;
        }
    }

    static getProperties(instance: User){
        var properties = ["id"];
        var properties = properties.concat(Object.getOwnPropertyNames(instance));
        properties.push("accessLevel");
        return properties;
    }
}