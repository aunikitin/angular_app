import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class DataService{
  
    constructor(private http: HttpClient){ }
      
    getById(id: string){
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.get('/api/getById', { params: params }); 
    }

    getData(limit, offset, filterObject){
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
        return this.http.get('/api/getData', {params: params});
    }
}