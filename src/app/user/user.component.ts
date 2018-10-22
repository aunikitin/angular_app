import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import User from '../../models/user';
import { ErrorService } from '../../services/err.service';
import { SettingsService } from '../../services/settings.service';
 
@Component({
    selector: 'user-comp',
    templateUrl: './user.component.html',
    providers: [UserService, SettingsService, ErrorService]
})
export class UserComponent implements OnInit {
    constructor(private authService: AuthService, 
        private userService: UserService, 
        private errorService: ErrorService, 
        private settingsService: SettingsService){}

    count: number;
    offset: number = 0;
    users: User[];
    properties: string[];
    defaultOptions = this.settingsService.defaultPagingOptions;
    editedUser: User;
    isNewRecord: boolean;
    statusMessage: string;
    pages: number;

    filterObject: User = new User("","","", "", "");

    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

    ngOnInit(){
        this.userService.getUsers(15, 0, null).subscribe((data: {count: number, rows: User[]})=>{
            this.users = data.rows;
            this.count = data.count;
            this.pages = Math.round(this.count / this.defaultOptions.limit);
            this.properties = User.getProperties(this.filterObject);
        },
        (err) =>{
            this.errorService.catchError(err);
        });
    }

    refreshData(){
        this.userService.getUsers(this.defaultOptions.limit, this.offset, this.filterObject).subscribe((data: {count: number, rows: User[]})=>{
            this.users = data.rows;
            this.count = data.count;
            this.pages = Math.round(this.count / this.defaultOptions.limit);
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
            this.pages = Math.round(this.count / this.defaultOptions.limit);
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
            this.pages = Math.round(this.count / this.defaultOptions.limit);
        },
        (err) =>{
            this.errorService.catchError(err);
        });
    }

    addUser(user: User){
        if(!this.isNewRecord){
            this.editedUser = new User("","","", "", 1);
            this.users.push(this.editedUser);
            this.isNewRecord = true;
        }
    }

    // сохраняем пользователя
    saveUser() {
        if (this.isNewRecord) {
            // добавляем пользователя
            this.userService.addUser(this.editedUser).subscribe(data => {
                this.statusMessage = 'Данные успешно добавлены';
                this.refreshData();
            },
            (err) =>{
                this.errorService.catchError(err);
            });
            this.isNewRecord = false;
            this.editedUser = null;
        } else {
            // изменяем пользователя
            this.userService.updateUser(this.editedUser.id, this.editedUser).subscribe(data => {
                this.statusMessage = 'Данные успешно обновлены';
                this.refreshData();
            },
            (err) =>{
                this.errorService.catchError(err);
            });
            this.editedUser = null;
        }
    }

    // редактирование пользователя
    editUser(user: User) {
        this.editedUser = new User(user.id, user.login, user.password, user.email, user.accessLevel);
    }
    // загружаем один из двух шаблонов
    loadTemplate(user: User) {
        if (this.editedUser && this.editedUser.id == user.id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }

    deleteUser(id: number){
        this.userService.deleteUser(id).subscribe(()=>{
            this.statusMessage = 'Данные успешно удалены';
            this.users.splice(this.users.findIndex(i => i.id == id), 1);
            this.refreshData();
        },
        (err) =>{
            this.errorService.catchError(err);
        });
    }

    // отмена редактирования
    cancel() {
        // если отмена при добавлении, удаляем последнюю запись
        if (this.isNewRecord) {
            this.users.pop();
            this.isNewRecord = false;
        }
        this.editedUser = null;
    }
}