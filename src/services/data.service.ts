import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataService{
  
    constructor(private http: HttpClient){ }
      
    getAllData(){
        return this.http.get('/api/getAllData'); 
    }
}