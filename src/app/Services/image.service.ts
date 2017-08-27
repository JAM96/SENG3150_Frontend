/*
 * SERVICE NAME: Image Service
 * Role: Retrieving the image data from the backend
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
export class ImageService {
    private url = this.data.getApiUrl('images');

    constructor(private http : Http, public data : DataService) {}

    fetchImages() {
        return this.http.get(this.url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
    }
}