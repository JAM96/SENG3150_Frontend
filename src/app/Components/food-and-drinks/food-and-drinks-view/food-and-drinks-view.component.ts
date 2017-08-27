import {Component} from '@angular/core';

//import objects
import {FoodAndDrinks} from '../../../Objects/FoodAndDrinks/FoodAndDrinks';

//import services
import {FoodAndDrinksService} from '../../../Services/FoodAndDrinks/food-and-drinks.service';
import {DataService} from '../../../Services/data.service'

@Component({
    moduleId: module.id,
    selector: 'food-and-drinks-list',
    templateUrl: 'food-and-drinks-view.component.html',
})

export class FoodAndDrinksListComponent {
    constructor(public data : DataService) {
        data.setNavigation(5);
    }
 }