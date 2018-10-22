import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
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
import { IndexComponent } from './main/index.component';
import { SocketService } from '../services/socket.service';
import { ChatComponent } from './chat/chat.component';
import { ChatLabelComponent } from './chat/chatLabel.component';
import { ConversationComponent } from './chat/conversation.component';
import { NewChannelComponent } from './chat/newChannel.component';
import {
    MatDialogModule,
    MatSelectModule,
  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// определение маршрутов
const appRoutes: Routes =[
    { path: '', redirectTo: 'index', pathMatch: 'full'},
    { path: 'index', component: IndexComponent, canActivate: [AuthGuard]},
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
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
    imports:      [ 
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, {enableTracing: true}),
        MatDialogModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatSelectModule,
    ],
    declarations: [ 
        AppComponent, 
        TableComponent, 
        MenuComponent, 
        MainComponent, 
        AdminComponent, 
        AuthorizeComponent, 
        NotFoundComponent, 
        PagingComponent,
        UserComponent,
        IndexComponent,
        ChatComponent,
        ChatLabelComponent,
        ConversationComponent,
        NewChannelComponent
    ],
    bootstrap:    [ AppComponent ],
    providers:    [
        AuthService,
        httpInterceptorProviders,
        AuthGuard,
        AccessGuard,
        SocketService
    ],
    entryComponents: [
        NewChannelComponent
    ]
})

export class AppModule { }