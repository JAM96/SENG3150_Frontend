import {Component, ViewChild, AfterViewInit} from '@angular/core'
import {MdDatepicker} from '@angular/material'
import {Router} from '@angular/router'

import {CustomPackageService} from '../custom-package-service/custom-package.service';

@Component({
    moduleId: module.id,
    selector: 'initial-custom-form',
    templateUrl: 'create-custom-package.component.html',
})

export class CreateCustomPackageInitialComponent implements AfterViewInit {
    minBudget = 300;
    maxBudget = 4000;

    //form data
    value : any = 472;
    guests: number = 1;
    rooms: number = 1;
    checkin : Date;
    checkout: Date;


    minDate = new Date();
    maxRooms: number = 10;
    maxGuests: number = 10;

    constructor (
        public router: Router,
        private packageService: CustomPackageService
        ) {}

    sendLog() {
        console.log("Outputting Output:::");
        console.log("   Budget: ", this.value);
        console.log("   Guests", this.guests);
        console.log("   Rooms: ", this.rooms);
        console.log("   checkin: ", this.checkin);
        console.log("   checkout: ", this.checkout);
        console.log("-- Log Complete");
    }

    submitForm() {
        console.log('budget: ', this.value);
        this.packageService.setInitialData(
            this.value,
            this.guests,
            this.rooms,
            this.checkin,
            this.checkout
            );
        this.router.navigate(["/createpackage"]);    
    }

    updateValue() {
        if(this.value == this.maxBudget) {
            this.value = "unlimited";
        }
    }

    ngAfterViewInit() {}

    increaseGuests() {
        if(this.guests != this.maxGuests) {
            this.guests = this.guests + 1;
        }
    }

    decreaseGuests() {
        if(this.guests != 1) {
            this.guests = this.guests - 1;
        }
    }

    increaseRooms() {
        if(this.rooms != this.maxRooms) {
            this.rooms = this.rooms + 1;
        }
    }

    decreaseRooms() {
        if(this.rooms != 1) {
            this.rooms = this.rooms - 1;
        }
    }
}