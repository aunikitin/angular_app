import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DataService } from '../../services/data.service'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import User from '../../models/user';
     
@Component({
    selector: 'nav-comp',
    templateUrl: './menu.component.html',
    providers: [DataService, UserService]
})
export class MenuComponent implements OnInit{ 
    constructor(private router: Router, 
        private authService: AuthService,
        private userService: UserService){} 

    isAdmin: boolean;
    @Output() isAuthorized = new EventEmitter(true)

    ngOnInit(){
        this.userService.getUserFromToken().subscribe((user: User)=>{
            this.isAdmin = user.accessLevel == 0;
        },
        err => console.log(err))
    }

    logOut(){
        window.localStorage.removeItem('X-access-token');
        window.localStorage.removeItem('access-level');
        this.isAuthorized.emit(false && !this.authService.isTokenExpired());
        this.router.navigate(['./login']);
    }
}