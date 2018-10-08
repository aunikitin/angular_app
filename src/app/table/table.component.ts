import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'

import Vulnerability from '../../models/vulnerability';
      
@Component({
    selector: 'table-comp',
    templateUrl: './table.component.html',
    providers: [DataService]
})
export class TableComponent implements OnInit{ 
    vulnerabilities: Vulnerability[];
    count: number;
    defaultOptions = {
        available:[5,10,15,20],
        limit:15
    }
    filterObject: Vulnerability = new Vulnerability();
    pages:number;
    offset: number;
    private _page: number = 0;
    get page(): number{
        return this._page;
    }
    set page(newPage: number){
        if(newPage < 0){
            this._page = 0;
        }else{
            if(newPage > (this.count/this.defaultOptions.limit)){
                this._page = Math.ceil(this.count/this.defaultOptions.limit);
            }else{
                this._page = Math.ceil(newPage);
            }
        }
    }
    constructor(private dataService: DataService){}
    
    ngOnInit(){
        this.dataService.getData(15, 0, null).subscribe((data: {count: number, rows: Vulnerability[]})=>{
            this.vulnerabilities = data.rows;
            this.count = data.count;
            this.pages = Math.ceil(data.count/15);
        });
    }

    limitChange(newLimit){
        this.dataService.getData(newLimit, 0, this.filterObject).subscribe((data: {count: number, rows: Vulnerability[]})=>{
            this.vulnerabilities = data.rows;
            this.count = data.count;
            this.pages = Math.ceil(data.count/newLimit);
        });
    }

    pageChange(newPage){
        this.page = newPage;
        this.offset = this.page * this.defaultOptions.limit;
        this.dataService.getData(this.defaultOptions.limit, this.offset, this.filterObject).subscribe((data: {count: number, rows: Vulnerability[]})=>{
            this.vulnerabilities = data.rows;
            this.count = data.count;
            this.pages = Math.ceil(data.count/this.defaultOptions.limit);
        });
    }

    filterChange(changedValue){
        this.offset = 0;
        this.dataService.getData(this.defaultOptions.limit, this.offset, this.filterObject).subscribe((data: {count: number, rows: Vulnerability[]})=>{
            this.vulnerabilities = data.rows;
            this.count = data.count;
            this.pages = Math.ceil(data.count/this.defaultOptions.limit);
        });
    }
}