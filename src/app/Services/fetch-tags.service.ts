/*
 * SERVICE NAME: Tags
 * Role: Retrieving the package data from the backend
 */

//Imports
import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {DataService} from './data.service';
//end imports

@Injectable()
export class TagService {
constructor(private http : Http, public data : DataService) {}
    private  url = this.data.getApiUrl('tags');
    public fetchTags() : Observable<any>{
        return this.http.get(this.url)
        .map((response:Response) => response.json().result)
            .catch((error:any) => Observable.throw(error.json().error || 'Cannot connect to the backend'));

    
    }
}

