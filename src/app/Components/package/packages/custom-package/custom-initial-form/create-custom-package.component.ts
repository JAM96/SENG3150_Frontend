import {Component, ViewChild, AfterViewInit} from '@angular/core'
import {MdDatepicker} from '@angular/material'
import {Router} from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'initial-custom-form',
    templateUrl: 'create-custom-package.component.html'
})

export class CreateCustomPackageInitialComponent implements AfterViewInit {
    minBudget = 300;
    maxBudget = 4000;
    value : any = 472;

    minDate = new Date();
    guests: number = 1;
    rooms: number = 1;
    maxRooms: number = 10;
    maxGuests: number = 10;

    constructor (public router: Router) {}

    submitForm() {
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