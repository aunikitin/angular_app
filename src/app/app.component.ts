import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service'
import { AuthService } from '../services/auth.service';
 
@Component({
    selector: 'start-comp',
    templateUrl: './app.component.html',
    providers: [ConnectionService]
})
export class AppComponent {
    constructor(private authService: AuthService){}

    isAuthorized = !this.authService.isTokenExpired();

    authorizeChanged(auth){
        this.isAuthorized = auth;
    }
}