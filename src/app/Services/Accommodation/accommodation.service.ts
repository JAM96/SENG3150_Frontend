/*
 * SERVICE NAME: Accommodation
 * Role: Retrieving the accommodation data from the backend
 * Created By: Jack Mennie
 * Date Completed: 14/08/17 
 */

//Imports
    import {Injectable} from '@angular/core';
    import {DataService} from '../data.service';
    import {Http, Response} from "@angular/http";
    import { Observable }     from 'rxjs/Observable';
    import 'rxjs/add/operator/catch';
    import 'rxjs/add/operator/map';
//end imports

@Injectable()
export class AccommodationService {
    constructor(private http : Http, public data : DataService) {}
    
    fetchAccommodation() {
        var url = this.data.getApiUrl('accommodation');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Could not retrieve Accommodation'));
    }

    fetchAccommodationFeatures() {
        var url = this.data.getApiUrl('accommodationFeatures');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Could not retrieve Accommodation features'));
    }

    fetchAccommodationRooms() {
        var url = this.data.getApiUrl('accommodationRooms');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Could not retrieve Accommodatio rooms'));
    }
    
    fetchAccommodationRoomFeatures() {
        var url = this.data.getApiUrl('accommodationRoomFeatures');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Could not retrieve room features'));
    }
}