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
        if(!(filterObject == null || filterObject == undefined)){
            for(const property in filterObject){
                if(filterObject[property] != null || filterObject[property] != ''){
                    params = params.append(property, filterObject[property]);
                }
            }
        }
        return this.http.get('/api/user/getUsers', {params: params });
    }

    addUser(user){
        return this.http.post('/api/user/add', user);
    }

    deleteUser(id: number){
        let params = new HttpParams();
        params = params.append('id', id.toString());
        return this.http.delete('/api/user/delete', { params: params });
    }

    updateUser(id: number, user){
        let body = {
            id: id,
            user: user
        };
        return this.http.post('/api/user/update', body);
    }
}