import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }   from './app.component';
import { TableComponent } from './table/table.component'
import { FilterComponent } from './filter/filter.component';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule ],
    declarations: [ AppComponent, TableComponent, FilterComponent, MenuComponent, MainComponent],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }