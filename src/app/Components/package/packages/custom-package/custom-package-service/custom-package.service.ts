import {Injectable} from '@angular/core';

import {CustomPackage} from '../CustomPackage';


@Injectable()
export class CustomPackageService {
    cp : CustomPackage;
    constructor(){
        this.cp = new CustomPackage;
    }

    setInitialData(
        budget: any,
        guests: number,
        rooms: number,
        checkin: Date,
        checkout: Date) {
            var data = new CustomPackage;
            data.budget = budget;
            data.guests = guests;
            data.rooms = rooms;
            data.checkin = checkin;
            data.checkout = checkout;
            
            this.cp = data;
    }

    getInitialData () {
        return this.cp
    }
}