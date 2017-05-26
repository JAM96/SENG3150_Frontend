import {Injectable} from '@angular/core';

import {Hotel} from '../../Objects/Hotel/hotel';
import {HOTEL_LIST} from '../../Objects/Hotel/MockData/Mock-Hotel';

import {Http, Response} from "@angular/http";
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HotelService {
    private url : string = "http://localhost:8080/accommodation"
    
    constructor(private http : Http) {}



    getHotels() {
        return this.http.get(this.url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getMockHotels() {
        return Promise.resolve(HOTEL_LIST);
    }
}