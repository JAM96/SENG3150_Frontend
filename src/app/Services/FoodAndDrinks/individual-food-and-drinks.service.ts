/*
 * SERVICE NAME: Activity
 * Role: Storing and sending one activity item through components
 * Created By: Jack Mennie
 * Date Created: 20/08/17 
 */

//Imports
    import {Injectable} from '@angular/core';
    import {FoodAndDrinks} from '../../Objects/FoodAndDrinks/FoodAndDrinks';
//end imports

@Injectable()
export class IndividualFoodAndDrinksService {
    foodAndDrinks : FoodAndDrinks;

    constructor() {}

    setFoodAndDrinks(foodAndDrinks : FoodAndDrinks) {
        this.foodAndDrinks = foodAndDrinks;
    }

    getFoodAndDrinks() : FoodAndDrinks {
        return this.foodAndDrinks;
    };
}