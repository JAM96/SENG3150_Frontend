import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Md2Dialog } from 'md2';

//import objects
import {FoodAndDrinks} from '../../Objects/FoodAndDrinks/FoodAndDrinks';
import {DataService} from '../../Services/data.service';

import {CustomPackageService} from '../../Services/Package/custom-package.service';

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

    private setForAll : boolean;

    constructor(private data : DataService,
        private packageService : CustomPackageService,
    ) {}
    
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

    private setFood(setForAll : boolean, dialog : Md2Dialog) {
        dialog.open();

        this.setForAll = setForAll;
    }

    private selectOption(value : any) : void {
        var days = this.packageService.getDays();

        //If user has selected a value then continue adding item to the package
        if(this.setForAll) {
            //if the user has selected to add to all days
            for(var i = 0; i < days.length; i++) {
                //create a temp object and deep copy the foodAndDrinks object to it
                var temp : FoodAndDrinks = Object.assign({}, this.foodAndDrinks);

                //set the day and time selected to the temp object
                temp.selectedDay = this.packageService.getDays[i];
                temp.selectedTime = value;

                //push to the foodAndDrinks array
                this.packageService.setFoodAndDrinks(temp, temp.foodAndDrinksID+days[i]);;
            }
        } else {
            //user has selected to add to day selected
            this.foodAndDrinks.selectedDay = this.selectedDay;
            this.foodAndDrinks.selectedTime = value;
            this.packageService.setFoodAndDrinks(this.foodAndDrinks, this.foodAndDrinks.foodAndDrinksID+this.selectedDay);
        }
    }

    private close(dialog : any) {
        dialog.close();
    }

    private removeFood(setForAll : boolean ) : void {
        this.packageService.removeFood(setForAll, this.foodAndDrinks, this.selectedDay);
    }

    private checkMenuType() : boolean {
        for(var i = 0; i < this.foodAndDrinks.menuType.length; i++) {
            if(this.foodAndDrinks.menuType[i].tagString == 'Bar') {
                return true;
            }
        }

        return false;
    }
}