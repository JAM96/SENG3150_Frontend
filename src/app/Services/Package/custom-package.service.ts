/*
    Name: Custom package service
    Role: Storing the data within the custom package form.
    can transfer object from different components.
*/
import {Injectable} from '@angular/core';
import {CustomPackage} from '../../Objects/Packages/CustomPackage/CustomPackage';


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
}