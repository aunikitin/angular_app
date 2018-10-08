import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'

import Vulnerability from '../../models/vulnerability';
      
@Component({
    selector: 'filter-comp',
    templateUrl: './filter.component.html',
    providers: [DataService]
})
export class FilterComponent{ 
    vulnerability = new Vulnerability();
    
    constructor(private dataService: DataService){}
    
    // ngOnInit(){
    //     this.dataService.getById('1').subscribe((data: Vulnerability) =>{
    //         this.vulnerability = data;
    //     })
    // }
}