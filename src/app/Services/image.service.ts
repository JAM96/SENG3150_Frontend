/*
 * SERVICE NAME: Image Service
 * Role: Retrieving the image data from the backend and storing it in the service
 * Once loaded, this data can be accessed by any component that requests it
 */

//Imports
    //core imports
        import {Injectable} from '@angular/core';
        import {Http, Response} from "@angular/http";
        import {Observable}     from 'rxjs/Observable';
        import 'rxjs/add/operator/catch';
        import 'rxjs/add/operator/map';
    //Data service
        import {DataService} from './data.service';
    //Objects
        import {Image} from '../Objects/Image';
//End Imports

@Injectable()
export class ImageService {
    private url = this.data.getApiUrl('images');    //Define the URL in which to get the images from
    private loaded : boolean = false;               //If the images have been loaded or not
    private images : Image[];                       //Store the images in the service

    constructor(private http : Http, private data : DataService) {}

    /**
     * FetchImages gets the JSON object from the defined URL
     * It then maps each object in the JSON object to a response
     */
    public fetchImages() : Observable<any> {
        return this.http.get(this.url)
            .map((response:Response) => response.json().result)
    }

    /**
     * isLoaded returns if the data has been loaded or not
     */
    public isLoaded() : boolean {
        return this.loaded;
    }


    /**
     * setLoaded sets the loaded state
     * @param value 
     */
    public setLoaded(value : boolean) : void {
        this.loaded = value;
    }

    /**
     * setData sets the images that have been loaded in another component
     * @param images 
     */
    public setData(images : Image[]) {
        this.images = images;
    }

    /**
     * getData returns the images to another component
     */
    public getData() : Image[] {
        return this.images;
    }
}