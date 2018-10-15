import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ConnectionService } from '../../services/connection.service'
import { AuthService } from '../../services/auth.service';
import User from '../../models/user'
import { Router } from '@angular/router';
 
@Component({
    selector: 'auth-comp',
    templateUrl: './authorize.component.html',
    providers: [ConnectionService]
})
export class AuthorizeComponent implements OnInit {
    constructor( private connectionService: ConnectionService, private authService: AuthService, private router: Router){}

    @ViewChild('authTemplate') authTemplate: TemplateRef<any>;
    @ViewChild('registerTemplate') registerTemplate: TemplateRef<any>;

    @Output() bindMenu = new EventEmitter<boolean>(false);
    
    login: string;
    password: string;
    email: string;
    err: string;
    authMode: boolean = true;

    ngOnInit(){
        window.localStorage.removeItem('X-access-token');
        window.localStorage.removeItem('access-level');
        this.bindMenu.emit(false);
    }

    // загружаем один из двух шаблонов
    loadTemplate() {
        if (this.authMode) {
            return this.authTemplate;
        } else {
            return this.registerTemplate;
        }
    }

    changeMode() {
        this.login = '';
        this.password = '';
        this.email = '';
        this.authMode = !this.authMode;
    }

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
        const user = new User(null, this.login, this.password, this.email, null);
        this.authService.authorize(user).subscribe((result: {auth: boolean, token: string, accessLevel: number}) => {
            if(result.auth){
                this.bindMenu.emit(true);
                window.localStorage.setItem('X-access-token', result.token);
                window.localStorage.setItem('access-level', result.accessLevel.toString());
                this.router.navigate(['/']);
            }
        }, error =>{
            //this.err = error.message;
            console.log(error.message);
        });
    }

    register(){
        const user = new User(null, this.login, this.password, this.email, null);
        this.authService.register(user).subscribe((result: {auth: boolean, token: string, accessLevel: number}) => {
            if(result.auth){
                this.bindMenu.emit(true);
                window.localStorage.setItem('X-access-token', result.token);
                window.localStorage.setItem('access-level', result.accessLevel.toString());
                this.router.navigate(['/']);
            }
        }, error =>{
            //this.err = error.message;
            console.log(error.message);
        });
    }
}