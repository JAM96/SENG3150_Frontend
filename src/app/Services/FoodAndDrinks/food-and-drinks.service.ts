/*
 * SERVICE NAME: Food and Drinks
 * Role: Retrieving the Food and drinks data from the backend
 */

//Imports
    import {Injectable} from '@angular/core';
    import {FoodAndDrinks} from '../../Objects/FoodAndDrinks/FoodAndDrinks';
    import {FOODANDDRINKS_LIST} from '../../Objects/FoodAndDrinks/MockData/mock-food-and-drinks';
    import {Http, Response} from "@angular/http";
    import {Observable}     from 'rxjs/Observable';
    import 'rxjs/add/operator/catch';
    import 'rxjs/add/operator/map';
    import {DataService} from '../data.service';
//end imports

@Injectable()
export class FoodAndDrinksService {
    foodAndDrinks : FoodAndDrinks[];

    constructor(private http : Http, public data : DataService) {
        this.fetchFoodAndDrinks().subscribe((foodAndDrinks : FoodAndDrinks[]) => this.foodAndDrinks = foodAndDrinks);
    }
    
    fetchFoodAndDrinks() {
        var url = this.data.getApiUrl('food-and-drinks');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error: could not retrieve food and drinks'));
       
    }

    getMockFood() {
        return Promise.resolve(FOODANDDRINKS_LIST);
    }

    getFoodAndDrinks() {
        for(var i = 0; i < this.foodAndDrinks.length; i++) {
            //Set the star array for each foodAndDrinks
            this.foodAndDrinks[i].stars = [];
            for(var j = 0; j < this.foodAndDrinks[i].starRating; j++) {
                this.foodAndDrinks[i].stars[j] = j;
            }
            console.log(this.foodAndDrinks[i].stars);

            //Assign the rating description for each foodAndDrinks
            switch(this.foodAndDrinks[i].userRating) {
                case 1: this.foodAndDrinks[i].rating = "Bad"; break;
                case 2: this.foodAndDrinks[i].rating = "Okay"; break;
                case 3: this.foodAndDrinks[i].rating = "Good"; break;
                case 4: this.foodAndDrinks[i].rating = "Great"; break;
                case 5: this.foodAndDrinks[i].rating = "Fabulous!"; break;
                default: this.foodAndDrinks[i].rating = ""; break;
            }

            //Assign the expense rating description for each foodAndDrinks
            this.foodAndDrinks[i].expense = [];
            for(var e = 0; e < this.foodAndDrinks[i].expenseRating; e++) {
                this.foodAndDrinks[i].expense[e] = e;
            }
            console.log(this.foodAndDrinks[i]);
        }

        return Promise.resolve(this.foodAndDrinks);
    }
}