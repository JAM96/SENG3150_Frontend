/*
 * SERVICE NAME: Food and Drinks
 * Role: Retrieving the Food and drinks data from the backend
 */

//Imports
    import {Injectable} from '@angular/core';
    import {Http, Response} from "@angular/http";
    import {Observable}     from 'rxjs/Observable';
    import 'rxjs/add/operator/catch';
    import 'rxjs/add/operator/map';
    import {DataService} from '../data.service';
//end imports

@Injectable()
export class FoodAndDrinksService {
    
    constructor(private http : Http, public data : DataService) {}
    
    fetchFoodAndDrinks() {
        var url = this.data.getApiUrl('food-and-drinks');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error: could not retrieve food and drinks'));
       
    }

    fetchFoodAndDrinksTime() {
        var url = this.data.getApiUrl('food-and-drinks-times');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error: could not retrieve food and drinks'));
       
    }
}