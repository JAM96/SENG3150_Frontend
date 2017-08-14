/*
 * SERVICE NAME: Accommodation
 * Role: Retrieving the accommodation data from the backend
 * Created By: Jack Mennie
 * Date Completed: 14/08/17 
 */

//Imports
    import {Injectable} from '@angular/core';
    import {Accommodation} from '../../Objects/Accommodation/Accommodation';
    import {ACCOMMODATION_LIST} from '../../Objects/Accommodation/MockData/Mock-Accommodation';
    import {DataService} from '../data.service';
    import {Http, Response} from "@angular/http";
    import { Observable }     from 'rxjs/Observable';
    import 'rxjs/add/operator/catch';
    import 'rxjs/add/operator/map';
//end imports

@Injectable()
export class AccommodationService {
    accommodation : Accommodation[];
    accommodationFeatures = [{accomodationID: "", feature: ""}];

    constructor(private http : Http, public data : DataService) {
        console.log("Fectching from the database");
        this.fetchAccommodation().subscribe((accommodation : Accommodation[]) => this.accommodation = accommodation);
        this.fetchAccommodationFeatures().subscribe(feature => this.accommodationFeatures = feature);
    }

    ngOnInit() {
        
    }
    
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
                .catch((error:any) => Observable.throw(error.json().error || 'Could not retrieve Accommodation'));
    }
    
    getAccommodation() {
        console.log('Returning accommodation promise' + this.accommodation);
        return Promise.resolve(this.accommodation);
    }

    getAccommodationFeatures() {
       return Promise.resolve(this.accommodationFeatures);
    }
    
    getMockAccommodation() {
        return Promise.resolve(ACCOMMODATION_LIST);
    }
}