import { Component } from '@angular/core';
import { ConnectionService } from '../services/connection.service'
import ConnectionSettings from '../models/connectionSettings'
import { AuthService } from '../services/auth.service';
import User from '../models/user'
 
@Component({
    selector: 'start-comp',
    templateUrl: './app.component.html',
    providers: [ConnectionService, AuthService]
})
export class AppComponent {
    constructor( private connectionService: ConnectionService, private authService: AuthService){}

    login: string;
    password: string;
    email: string;
    err: string;

    validate(property){
        switch(property){
            case 'login':
                if(this.login === '' || this.login === null){
                    this.err = 'Введите логин';
                }else{
                    this.err = '';
                }
                break;
            case 'password':
                if(this.password === '' || this.password === null){
                    this.err = 'Введите пароль';
                }else{
                    this.err = '';
                }
                break;
            case 'email':
                if(this.email === '' || this.email === null){
                    this.err = 'Введите логин';
                }else{
                    this.err = '';
                }
                break;
        }
    }

    authorize(){
        const user = new User(this.login, this.password, this.email);
        this.authService.authorize(user).subscribe((result: {auth: boolean, token: string}) => {
            if(result.auth){
                window.localStorage.setItem('X-access-token', result.token);
            }
        }, error =>{
            //this.err = error.message;
            console.log(error.message);
        });
    }

    register(){
        const user = new User(this.login, this.password, this.email);
        this.authService.register(user).subscribe((result: {auth: boolean, token: string}) => {
            if(result.auth){
                window.localStorage.setItem('X-access-token', result.token);
            }
        }, error =>{
            //this.err = error.message;
            console.log(error.message);
        });
    }
}