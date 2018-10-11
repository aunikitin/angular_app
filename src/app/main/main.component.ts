import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'
     
@Component({
    selector: 'filter-comp',
    templateUrl: './main.component.html',
    providers: [DataService]
})
export class MainComponent{ 
    constructor(private dataService: DataService){}
    
    // ngOnInit(){
    //     this.dataService.getById('1').subscribe((data: Vulnerability) =>{
    //         this.vulnerability = data;
    //     })
    // }
}