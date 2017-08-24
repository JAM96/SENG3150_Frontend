/*
    Name: Custom package service
    Role: Storing the data within the custom package form.
    can transfer object from different components.
*/
import {Injectable} from '@angular/core';

import {CustomPackage} from '../CustomPackage';


@Injectable()
export class CustomPackageService {
    customPackage : CustomPackage;

    constructor(){
        this.customPackage = new CustomPackage;
    }

    setInitialData(
        budget: any,
        guests: number,
        rooms: number,
        checkin: Date,
        checkout: Date) : void {
            var data = new CustomPackage;
            data.budget = budget;
            data.guests = guests;
            data.rooms = rooms;
            data.checkin = checkin;
            data.checkout = checkout;
            
            this.cp = data;
    }

    getPackage() : CustomPackage {
        return this.cp
    }
}