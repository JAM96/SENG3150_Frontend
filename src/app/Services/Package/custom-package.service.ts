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
        this.customPackage.previousSelectedAccommodation = previousCost;
    }

    public getPackageCost() : number {
        return this.customPackage.packageCost - this.customPackage.previousSelectedAccommodation;
    }
}