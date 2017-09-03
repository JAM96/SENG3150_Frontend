import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Md2Dialog } from 'md2';

//import objects
import {FoodAndDrinks} from '../../Objects/FoodAndDrinks/FoodAndDrinks';
import {DataService} from '../../Services/data.service';

@Component({
    moduleId: module.id,
    selector: 'food-and-drinks',
    templateUrl: 'food-and-drinks.component.html',
    styles: [],
})

export class FoodAndDrinksComponent {
    @Input() private foodAndDrinks : FoodAndDrinks;
    @Input() private selectedFoodAndDrinks : String[];
    @Input() private view : string;
    @Input() private selectedDay : number;
    @Input() private pItem : boolean;
    
    @Output() private selected = new EventEmitter<FoodAndDrinks>();

    constructor(private data : DataService) {}
    
    /**
     * opens the dialog
     * @param dialog 
     */
    private viewItem(dialog : Md2Dialog) {
        dialog.open();
    }

    /**
     * Outputs the selected food and drink item
     * @param foodAndDrinks 
     */
    private addFoodAndDrinks() : void {
        this.selected.emit(this.foodAndDrinks);
    }

    /*  The checkFood function goes through the selecedFoodAndDrinks array
        and compares the item id and the selected item id
        
        If they are equal, then item has been added to the package, hence show 'Remove Item'
        If they are not equal, then item has not been added to the package, hence show 'Add Item'
    */
    private checkFood() : boolean {
        if(this.pItem) {
            for(var i = 0; i < this.selectedFoodAndDrinks.length; i++)
                if(this.foodAndDrinks.foodAndDrinksID + this.selectedDay == this.selectedFoodAndDrinks[i]) 
                    return false;
            return true;
        } else {
            return false;
        }
    }
}