import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service'
import { AuthService } from '../services/auth.service';
 
@Component({
    selector: 'start-comp',
    templateUrl: './app.component.html',
    providers: [ConnectionService, AuthService]
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService){}

    auth: boolean;
    ngOnInit(){
        this.auth = !this.authService.isTokenExpired() && window.localStorage.getItem("access-level") !== null;
    }
}