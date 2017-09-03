import {Component} from '@angular/core';

//import objects
import {FoodAndDrinks} from '../../../Objects/FoodAndDrinks/FoodAndDrinks';
import {Image} from '../../../Objects/Image';

//import services
import {FoodAndDrinksService} from '../../../Services/FoodAndDrinks/food-and-drinks.service';
import {DataService} from '../../../Services/data.service'
import {ImageService} from '../../../Services/image.service';

@Component({
    moduleId: module.id,
    selector: 'food-and-drinks-list',
    templateUrl: 'food-and-drinks-view.component.html',
})

export class FoodAndDrinksListComponent {
    private foodAndDrinks : FoodAndDrinks[];

    private view : number = 1;

    constructor(
        private data : DataService,
        private imageService : ImageService,
        private foodAndDrinksService : FoodAndDrinksService,
    ) {
        data.setNavigation(5);
        this.fetch();
    }


    private fetch() : void {
        this.foodAndDrinks = this.foodAndDrinksService.getData();
    }

    private checkLoad() : boolean {
        if(this.imageService.isLoaded() && this.foodAndDrinksService.isLoaded()) {
           // this.completeLoading();
            return true;
        } else {
            return false;
        }
    }
 }