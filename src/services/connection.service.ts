import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import ConnectionSettings from '../models/connectionSettings';

@Injectable()
export class ConnectionService{
  
    constructor(private http: HttpClient){ }
      
    connectToDb(connectionSettings: ConnectionSettings){
        return this.http.post('/api/connectToDb', connectionSettings); 
    }
}