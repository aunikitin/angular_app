import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable()
export class DataService{
  
    constructor(private http: HttpClient){ }
      
    getById(id: string){
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.get('/api/data/getById', { params: params}); 
    }

    getData(limit, offset, filterObject){
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
        return this.http.get('/api/data/getData', {params: params});
    }
}