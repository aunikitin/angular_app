import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import User from '../models/user';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService{
    currentUser: User; // TODO: убрать
  
    constructor(private http: HttpClient){ }
   
    register(user: User){
        return this.http.post('/api/register', user);
    }

    authorize(user: User){
        return this.http.post('/api/auth', user);
    }

    // TODO: убрать
    haveAllRights(){
        return parseInt(window.localStorage.getItem("access-level")) > 0;
    }

    getToken(){
        const token = window.localStorage.getItem("X-access-token");
        return token == null? "" : token;
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token) as any;
    
        if (decoded.exp === undefined) return null;
    
        const date = new Date(0); 
        date.setUTCSeconds(decoded.exp);
        return date;
    }
    
    isTokenExpired(token?: string): boolean {
        if(!token) token = this.getToken();
        if(!token) return true;
    
        const date = this.getTokenExpirationDate(token);
        if(date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }
}