import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ErrorService } from '../../services/err.service';
import { SettingsService } from '../../services/settings.service';
      
@Component({
    selector: 'paging-comp',
    templateUrl: './paging.component.html',
    providers: [DataService, ErrorService, SettingsService]
})
export class PagingComponent{
    constructor(private settingsService: SettingsService){}

    @Output() outputLimit = new EventEmitter<any>();
    @Output() outputPage = new EventEmitter<any>();

    @Input() count: number;
    
    defaultOptions = this.settingsService.defaultPagingOptions;
    limit: number = this.defaultOptions.limit;
    pages: number = this.count / this.limit;
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

    limitChange(newLimit){
        this.limit = newLimit;
        this.outputLimit.emit(this.limit);
    }

    pageChange(newPage){
        this.page = newPage;
        this.outputPage.emit(this.page);
    }
}