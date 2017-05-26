import {Injectable} from '@angular/core';

import {Food} from '../../Objects/Food/food';
import {FOOD_LIST} from '../../Objects/Food/MockData/mock-food';

import {Http, Response} from "@angular/http";
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class FoodService {
    private url : string = "http://localhost:8080/foodAndDrinks"
    
    constructor(private http : Http) {}

    data : Food[]

    getFood() {
        return this.http.get(this.url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
       
    }

    getMockFood() {
        return Promise.resolve(FOOD_LIST);
    }


    someFunction() {
        return Promise.resolve( this.http.get(this.url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error')))
    }
}