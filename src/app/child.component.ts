import { Component, Input, Output, EventEmitter } from '@angular/core';
      
@Component({
    selector: 'child-comp',
    templateUrl: '../views/child.component.html',
    styles: [`h2, p {color:red;}`]
})
export class ChildComponent{ 
    @Output() onChanged = new EventEmitter<boolean>();
    change(increased:any) {
        this.onChanged.emit(increased);
    }
}