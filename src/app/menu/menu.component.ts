import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'
     
@Component({
    selector: 'nav-comp',
    templateUrl: './menu.component.html',
    providers: [DataService]
})
export class MenuComponent implements OnInit{ 
    constructor(){} 

    isAdmin: boolean;

    ngOnInit(){
        this.isAdmin = parseInt(window.localStorage.getItem("access-level")) == 0;
    }
}