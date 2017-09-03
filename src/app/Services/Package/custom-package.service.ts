/*
    Name: Custom package service
    Role: Storing the data within the custom package form.
    can transfer object from different components.
*/
import {Injectable} from '@angular/core';
import {CustomPackage} from '../../Objects/Packages/CustomPackage/CustomPackage';

import {Accommodation} from '../../Objects/Accommodation/Accommodation';
import {Room} from '../../Objects/Accommodation/Room';
import {FoodAndDrinks} from '../../Objects/FoodAndDrinks/FoodAndDrinks';
import {Activity} from '../../Objects/Activity/Activity';


@Injectable()
export class CustomPackageService {
    private customPackage : CustomPackage;

    constructor() {
        this.customPackage = new CustomPackage;
    }

    /**
     * Obtains a custom package and sets it to the services custom package.
     * @param customPackage 
     */
    setPackage(customPackage : CustomPackage) : void {
        this.customPackage = customPackage;
    }

    /**
     * returns a CustomPackage object
     */
    getPackage() : CustomPackage {
        return this.customPackage
    }

    /**
     * Sets the initial data required to complete the custom
     * package form
     * @param budget 
     * @param guests 
     * @param rooms 
     * @param checkin 
     * @param checkout 
     */
    setInitialPackageData(
        budget  : number,
        guests  : number,
        rooms   : number,
        checkin : Date,
        checkout: Date
    ) : void {
        this.customPackage.budget = budget;
        this.customPackage.guests = guests;
        this.customPackage.rooms = rooms;
        this.customPackage.checkin = checkin;
        this.customPackage.checkout = checkout;
    }

    public setAccommodation(accommodation : Accommodation, room : Room) : void {
        this.customPackage.accommodation = accommodation;
        this.customPackage.accommodation.selectedRoom = room;
    }

    public setPackageCost(cost : number, previousCost : number) : void {
        this.customPackage.packageCost = cost;
        if(previousCost != null) {
            this.customPackage.previousSelectedAccommodation = previousCost;
        }
    }

    public getPackageCost() : number {
        return this.customPackage.packageCost - this.customPackage.previousSelectedAccommodation;
    }

    public getDays() : number[] {
        return this.customPackage.days;
    }

    public setFoodAndDrinks(foodAndDrinks : FoodAndDrinks, id : string) : void {
        this.customPackage.foodAndDrinks.push(foodAndDrinks);
        this.customPackage.selectedFoodAndDrinks.push(id);
    }

    public removeFood(setForAll : boolean, foodAndDrinks : FoodAndDrinks, selectedDay : number) : void {
        if(setForAll) {
            var temp = this.customPackage.foodAndDrinks.filter(function(el) {
                return el.foodAndDrinksID !== foodAndDrinks.foodAndDrinksID;
            })

            this.customPackage.foodAndDrinks = temp;

            for(var i = 0; i < this.customPackage.selectedFoodAndDrinks.length; i++) {
                for(var j = 1; j <= this.customPackage.days.length; j++) {
                    if(this.customPackage.selectedFoodAndDrinks[i] == foodAndDrinks.foodAndDrinksID + j){
                        this.customPackage.selectedFoodAndDrinks.splice(j, 1);
                    }
                }
            }
        } else {
            for(var i = 0; i < this.customPackage.foodAndDrinks.length; i++) {
                if(this.customPackage.foodAndDrinks[i].foodAndDrinksID == foodAndDrinks.foodAndDrinksID
                    && this.customPackage.foodAndDrinks[i].selectedDay == selectedDay
                ) {
                    this.customPackage.foodAndDrinks.splice(i, 1);
                }
            }

            for(var j = 0; j < this.customPackage.selectedFoodAndDrinks.length; j++) {
                if(this.customPackage.selectedFoodAndDrinks[j] == foodAndDrinks.foodAndDrinksID + selectedDay){
                    this.customPackage.selectedFoodAndDrinks.splice(j, 1);
                }
            }
        }

    }

    public setActivity(activity : Activity, id : string) {
        this.customPackage.activity.push(activity);
        this.customPackage.selectedActivities.push(id);
    }

    public removeActivity(activity : Activity, selectedDay : number) {
        for(var i = 0; i < this.customPackage.activity.length; i++) {
            if(this.customPackage.activity[i].activityID == activity.activityID
                && this.customPackage.activity[i].selectedDay == selectedDay
            ) {
                this.customPackage.activity.splice(i, 1);
            }
        }

        for(var j = 0; j < this.customPackage.selectedActivities.length; j++) {
            if(this.customPackage.selectedActivities[j] == activity.activityID + selectedDay){
                this.customPackage.selectedActivities.splice(j, 1);
            }
        }
        
        this.customPackage.packageCost = this.customPackage.packageCost - activity.price;
    }
}