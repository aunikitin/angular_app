import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ErrorService } from '../../services/err.service';

import Vulnerability from '../../models/vulnerability';
import { SettingsService } from '../../services/settings.service';
      
@Component({
    selector: 'table-comp',
    templateUrl: './table.component.html',
    providers: [DataService, ErrorService, SettingsService]
})
export class TableComponent implements OnInit{ 
    vulnerabilities: Vulnerability[];
    count: number;
    properties: string[];
    defaultOptions = this.settingsService.defaultPagingOptions;
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
                this._page = Math.round(this.count/this.defaultOptions.limit);
            }else{
                this._page = Math.round(newPage);
            }
        }
    }
    constructor(private dataService: DataService, private errorService: ErrorService, private settingsService: SettingsService){}
    
    ngOnInit(){
        this.dataService.getData(15, 0, null).subscribe((data: {count: number, rows: Vulnerability[]})=>{
            this.vulnerabilities = data.rows;
            this.count = data.count;
            this.pages = Math.round(data.count/15);
            this.properties = Vulnerability.getProperties(this.filterObject);
        },
        (err) =>{
            this.errorService.catchError(err);
        });
    }

    limitChange(newLimit){
        this.defaultOptions.limit = newLimit;
        this.dataService.getData(newLimit, 0, this.filterObject).subscribe((data: {count: number, rows: Vulnerability[]})=>{
            this.vulnerabilities = data.rows;
            this.count = data.count;
            this.pages = Math.round(data.count/newLimit);
        },
        (err) =>{
            this.errorService.catchError(err);
        });
    }

    pageChange(newPage){
        this.page = newPage;
        this.offset = this.page * this.defaultOptions.limit;
        this.dataService.getData(this.defaultOptions.limit, this.offset, this.filterObject).subscribe((data: {count: number, rows: Vulnerability[]})=>{
            this.vulnerabilities = data.rows;
            this.count = data.count;
            this.pages = Math.round(data.count/this.defaultOptions.limit);
        },
        (err) =>{
            this.errorService.catchError(err);
        });
    }

    filterChange(changedValue){
        this.offset = 0;
        this.dataService.getData(this.defaultOptions.limit, this.offset, this.filterObject).subscribe((data: {count: number, rows: Vulnerability[]})=>{
            this.vulnerabilities = data.rows;
            this.count = data.count;
            this.pages = Math.round(data.count/this.defaultOptions.limit);
        },
        (err) =>{
            this.errorService.catchError(err);
        });
    }
}