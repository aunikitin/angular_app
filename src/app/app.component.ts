import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service'
import Item from '../models/purchase'
import ConnectionSettings from '../models/connectionSettings'
 
@Component({
    selector: 'purchase-app',
    templateUrl: './app.component.html',
    providers: [ConnectionService]
})
export class AppComponent {
    constructor( private connectionService: ConnectionService){}

    public connectionSettings = new ConnectionSettings();
    public host: string = this.connectionSettings.options.host;
    public username: string = this.connectionSettings.userName;
    public password: string = this.connectionSettings.password;
    public port: string = this.connectionSettings.options.port;
    public dbname: string = this.connectionSettings.dbName;

    connect(){
        this.connectionSettings.options.host = this.host;
        this.connectionSettings.userName = this.username;
        this.connectionSettings.dbName = this.dbname;
        this.connectionSettings.options.port = this.port;
        this.connectionSettings.password = this.password;
        this.connectionService.connectToDb(this.connectionSettings).subscribe((data) => console.log(data));
    }
}