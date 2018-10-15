import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'
import { AuthService } from '../../services/auth.service';
     
@Component({
    selector: 'main-comp',
    templateUrl: './main.component.html',
    providers: [DataService, AuthService]
})
export class MainComponent{ 
    constructor(private dataService: DataService, private authService: AuthService){}
    
    ngOnInit(){
    }
}