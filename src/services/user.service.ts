import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService{
  
    constructor(private http: HttpClient){ }
      
    getById(id: string){
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.get('/api/user/getById', { params: params }); 
    }

    getUsers(limit, offset, filterObject){
        let params = new HttpParams();
        params = params.append('limit', limit);
        params = params.append('offset', offset);
        if(filterObject != null){
            for(const property in filterObject){
                if(filterObject[property] != null || filterObject[property] != ''){
                    params = params.append(property, filterObject[property]);
                }
            }
        }
        return this.http.get('/api/user/getUsers', {params: params});
    }

    addUser(){

    }

    deleteUser(){
        
    }
}