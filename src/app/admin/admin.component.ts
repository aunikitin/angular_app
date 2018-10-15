import { Component } from '@angular/core';
import { ConnectionService } from '../../services/connection.service'
import ConnectionSettings from '../../models/connectionSettings'
 
@Component({
    selector: 'db-info',
    templateUrl: './admin.component.html',
    providers: [ConnectionService]
})
export class AdminComponent {
    constructor( private connectionService: ConnectionService){}

    public connectionSettings = new ConnectionSettings();
    public host: string = this.connectionSettings.options.host;
    public username: string = this.connectionSettings.userName;
    public password: string = this.connectionSettings.password;
    public port: string = this.connectionSettings.options.port;
    public dbname: string = this.connectionSettings.dbName;
}