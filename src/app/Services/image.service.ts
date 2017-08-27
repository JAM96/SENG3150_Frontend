/*
 * SERVICE NAME: Packages
 * Role: Retrieving the package data from the backend
 */

//Imports
import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Image} from '../Objects/Image';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {DataService} from './data.service';
//end imports

@Injectable()
export class ImageService {
    images : Image[];

    constructor(private http : Http, public data : DataService) {
        console.log("Fectching from the database");
        this.fetchImages().subscribe((image : Image[]) => this.images = image);
        console.log("DONE");
        console.log(this.images);
    }
     
    url = this.data.getApiUrl('images');

    fetchImages() {
        return this.http.get(this.url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
    }


    getImages() {
        console.log(this.images);
        return Promise.resolve(this.images);
    }
}