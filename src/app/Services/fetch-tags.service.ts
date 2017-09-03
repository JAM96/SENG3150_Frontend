/*
 * SERVICE NAME: Tag Service
 * Role: Retrieving tags from the backend and storing it in the service
 * Once loaded, this data can be accessed by any component that requests it
 */

//Imports
    //Core
        import {Injectable} from '@angular/core';
        import {Http, Response} from "@angular/http";
        import {Observable}     from 'rxjs/Observable';
        import 'rxjs/add/operator/catch';
        import 'rxjs/add/operator/map';
    //Data Service
        import {DataService} from './data.service';
    //Objects
        import {Tag} from '../Objects/Tag';
//end imports

@Injectable()
export class TagService {
constructor(private http : Http, public data : DataService) {}
    private  url = this.data.getApiUrl('tags'); //define the URL in which to get the tags from
    private loaded : boolean = false; //if the tags have been loaded or not
    private tags : Tag[]; //store the tags in the service

    /**
     * fetchTags gets the JSON object from the defined URL
     * It then maps each object in the JSON object to a response
     */
    public fetchTags() : Observable<any> {
        return this.http.get(this.url)
        .map((response:Response) => response.json().result)
            .catch((error:any) => Observable.throw(error.json().error || 'Cannot connect to the backend'));
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
     * setData sets the tags that have been loaded in another component
     * @param data 
     */
    public setData(data : Tag[]) {
        this.tags = data;
    }

    /**
     * getData returns the tags to another component
     */
    public getData() : Tag[] {
        return this.tags;
    }
}

