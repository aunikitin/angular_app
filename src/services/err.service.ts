import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorService{
    constructor(private router: Router){}

    catchError(err){
        switch(err.status){
            case 401:
                this.router.navigate(['/login']);
                break;
        }
    }
}