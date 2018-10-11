import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import User from '../models/user';

@Injectable()
export class AuthService{
  
    constructor(private http: HttpClient){ }
   
    register(user: User){
        return this.http.post('/api/register', user);
    }

    authorize(user: User){
        return this.http.post('/api/auth', user);
    }
}