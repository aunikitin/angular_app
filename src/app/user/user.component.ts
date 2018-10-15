import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import User from '../../models/user';
import { ErrorService } from '../../services/err.service';
import { SettingsService } from '../../services/settings.service';
 
@Component({
    selector: 'user-comp',
    templateUrl: './user.component.html',
    providers: [AuthService, UserService, SettingsService, ErrorService]
})
export class UserComponent implements OnInit {
    constructor(private authService: AuthService, 
        private userService: UserService, 
        private errorService: ErrorService, 
        private settingsService: SettingsService){}

    count: number;
    offset: number;
    users: User[];
    properties: string[];
    defaultOptions = this.settingsService.defaultPagingOptions;

    filterObject: User = new User("","","");

    ngOnInit(){
        this.userService.getUsers(15, 0, null).subscribe((data: {count: number, rows: User[]})=>{
            this.users = data.rows;
            this.count = data.count;
            this.properties = User.getProperties(this.filterObject);
        },
        (err) =>{
            this.errorService.catchError(err);
        });
    }

    limitChange(newLimit){
        this.defaultOptions.limit = newLimit;
        this.userService.getUsers(newLimit, 0, this.filterObject).subscribe((data: {count: number, rows: User[]})=>{
            this.users = data.rows;
            this.count = data.count;
        },
        (err) =>{
            this.errorService.catchError(err);
        });
    }

    pageChange(newPage){
        this.offset = newPage * this.defaultOptions.limit;
        this.userService.getUsers(this.defaultOptions.limit, this.offset, this.filterObject).subscribe((data: {count: number, rows: User[]})=>{
            this.users = data.rows;
            this.count = data.count;
        },
        (err) =>{
            this.errorService.catchError(err);
        });
    }

    filterChange(changedValue){
        this.offset = 0;
        this.userService.getUsers(this.defaultOptions.limit, this.offset, this.filterObject).subscribe((data: {count: number, rows: User[]})=>{
            this.users = data.rows;
            this.count = data.count;
        },
        (err) =>{
            this.errorService.catchError(err);
        });
    }

    addNewUser(){
        
    }
}