import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DataService } from '../../services/data.service'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
     
@Component({
    selector: 'nav-comp',
    templateUrl: './menu.component.html',
    providers: [DataService, AuthService]
})
export class MenuComponent implements OnInit{ 
    constructor(private router: Router, private authService: AuthService){} 

    isAdmin: boolean;
    @Output() isAuthorized = new EventEmitter(true)

    ngOnInit(){
        this.isAdmin = this.authService.currentUser.accessLevel == 0;
    }

    logOut(){
        window.localStorage.removeItem('X-access-token');
        window.localStorage.removeItem('access-level');
        this.isAuthorized.emit(false && !this.authService.isTokenExpired());
        this.router.navigate(['./login']);
    }
}