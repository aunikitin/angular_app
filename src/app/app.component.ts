import { Component } from '@angular/core';
import Item from '../../models/purchase'
 
@Component({
    selector: 'purchase-app',
    templateUrl: '../views/app.component.html'
})
export class AppComponent {
    items: Item[] = 
    [
        { purchase: "Хлеб", done: false, price: 15.9 },
        { purchase: "Масло", done: false, price: 60 },
        { purchase: "Картофель", done: true, price: 22.6 },
        { purchase: "Сыр", done: false, price:310 }
    ];

    name = "Scott"

    addItem(text: string, price: number): void {  
        if(text==null || text.trim()=="" || price==null)
            return;
        this.items.push(new Item(text, price));
    };

    clicks:number = 0;
    onChanged(increased:any){
        increased==true?this.clicks++:this.clicks--;
    }
}