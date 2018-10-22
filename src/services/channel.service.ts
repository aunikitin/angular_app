import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ChannelService{
    constructor(private http: HttpClient){ }
      
    getById(id: string){
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.get('/api/channel/getById', { params: params }); 
    }

    getChannels(filterObject?){
        let params = new HttpParams();
        if(!(filterObject == null || filterObject == undefined)){
            for(const property in filterObject){
                if(filterObject[property] != null || filterObject[property] != ''){
                    params = params.append(property, filterObject[property]);
                }
            }
        }
        return this.http.get('/api/chat/getChannels', { params: params });
    }

    addChannel(channel){
        return this.http.post('/api/channel/add', channel);
    }

    deleteChannel(id: number){
        let params = new HttpParams();
        params = params.append('id', id.toString());
        return this.http.delete('/api/channel/delete', { params: params });
    }
}