import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'

import Vulnerability from '../../models/vulnerability';
      
@Component({
    selector: 'table-comp',
    templateUrl: './table.component.html',
    providers: [DataService]
})
export class TableComponent implements OnInit{ 
    receivedData = new Array<Vulnerability>();
    done = false;
    
    constructor(private dataService: DataService){}
    
    ngOnInit(){
        this.dataService.getAllData().subscribe((data: Vulnerability[]) =>{
            console.log('here');
            this.receivedData = data;
            this.done = true;
        })
    }
    // @Input() userName:string;
    // @Output() userNameChange = new EventEmitter<string>();
    // onNameChange(model: string){      
    //     this.userName = model;
    //     this.userNameChange.emit(model);
    // }
}