import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable()
export class MessageService{
    constructor(private http: HttpClient){ }
      
    getMessages(channelId: string){
        let params = new HttpParams();
        params = params.append('id', channelId);
        return this.http.get('/api/message/getMessages', { params: params }); 
    }
}