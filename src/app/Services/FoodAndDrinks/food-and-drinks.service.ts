/*
 * SERVICE NAME: Food and Drinks
 * Role: Retrieving the Food and drinks data from the backend
 */

//Imports
    import {Injectable} from '@angular/core';
    import {FOODANDDRINKS_LIST} from '../../Objects/FoodAndDrinks/MockData/mock-food-and-drinks';
    import {Http, Response} from "@angular/http";
    import {Observable}     from 'rxjs/Observable';
    import 'rxjs/add/operator/catch';
    import 'rxjs/add/operator/map';
    import {DataService} from '../data.service';
//end imports

@Injectable()
export class FoodAndDrinksService {
    constructor(private http : Http, public data : DataService) {}
    
    getFoodAndDrinks() {
        var url = this.data.getApiUrl('food-and-drinks');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
       
    }

    getMockFood() {
        return Promise.resolve(FOODANDDRINKS_LIST);
    }
}