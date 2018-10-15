import { Component, Output, EventEmitter, Input } from '@angular/core';
     
@Component({
    selector: 'main-comp',
    templateUrl: './main.component.html',
    providers: []
})
export class MainComponent{ 
    constructor(){}
    
    @Output() isAuthorized = new EventEmitter<boolean>()

    authorizeChanged(auth){
        this.isAuthorized.emit(auth);
    }
}