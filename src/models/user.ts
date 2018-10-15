import { throwError } from "rxjs";

export default class User {
    id: number;
    login: string = "";
    password: string;
    email: string = "";
    accessLevel: Custom.AccessLevel

    constructor(id, login, password, email, accessLevel){
        if(id){
            this.id = id;
        }
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
        if(accessLevel != null){
            this.accessLevel = accessLevel;
        }else{
            this.accessLevel = Custom.AccessLevel.user;
        }
    }

    static getProperties(instance: User){
        var properties = ["id", "login", "password", "email", "accessLevel"];
        //var properties = properties.concat(Object.getOwnPropertyNames(instance));
        return properties;
    }
}