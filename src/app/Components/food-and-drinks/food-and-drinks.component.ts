import {Component, Input, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

//import objects
import {FoodAndDrinks} from '../../Objects/FoodAndDrinks/FoodAndDrinks';

//import services
import {IndividualFoodAndDrinksService} from '../../Services/FoodAndDrinks/individual-food-and-drinks.service';

@Component({
    moduleId: module.id,
    selector: 'food-and-drinks',
    templateUrl: 'food-and-drinks.component.html',
    styles: [],
})

export class FoodAndDrinksComponent implements OnInit{
    foodAndDrinks : FoodAndDrinks;
    
     constructor(
        private foodAndDrinksService    :   IndividualFoodAndDrinksService,
        public dialogRef: MdDialogRef<FoodAndDrinksComponent>
        ) {}
    
    ngOnInit() {
        this.foodAndDrinks = Object.assign({}, this.foodAndDrinksService.getFoodAndDrinks());
        console.log("foodAndDrinks is loaded: " + this.foodAndDrinks.name);
    }
}