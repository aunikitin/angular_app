import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent }   from './app.component';
import { TableComponent } from './table/table.component'
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { AuthorizeComponent } from './authorize/authorize.component';
import { NotFoundComponent } from './not-found.component';
import { AuthService } from '../services/auth.service';
import { AuthInterceptor } from '../http-interceptors/auth-interceptor';
import { AuthGuard } from './auth.guard';
import { AccessGuard } from './access.guard';
import { PagingComponent } from './paging/paging.component';
import { UserComponent } from './user/user.component';

// определение маршрутов
const appRoutes: Routes =[
    { path: '', component: MainComponent, canActivate: [AuthGuard]},
    { path: 'users', component: UserComponent, canActivate: [AuthGuard, AccessGuard]},
    { path: 'vulnerabilities', component: TableComponent, canActivate: [AuthGuard]},
    { path: 'login', component: AuthorizeComponent},
    { path: 'logout', redirectTo: 'login'},
    { path: '**', component: NotFoundComponent }
];

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes, {enableTracing: true}) ],
    declarations: [ 
        AppComponent, 
        TableComponent, 
        MenuComponent, 
        MainComponent, 
        AdminComponent, 
        AuthorizeComponent, 
        NotFoundComponent, 
        PagingComponent,
        UserComponent],
    bootstrap:    [ AppComponent ],
    providers:    [ AuthService, httpInterceptorProviders, AuthGuard, AccessGuard ]
})

export class AppModule { }