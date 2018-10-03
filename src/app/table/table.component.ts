import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
      
@Component({
    selector: 'table-comp',
    templateUrl: './table.component.html',
    styles: [`h2, p {color:red;}`]
})
export class TableComponent implements OnInit{ 
    
    ngOnInit(){

    }
    // @Input() userName:string;
    // @Output() userNameChange = new EventEmitter<string>();
    // onNameChange(model: string){      
    //     this.userName = model;
    //     this.userNameChange.emit(model);
    // }
}