import {Component, ViewChild, AfterViewInit} from '@angular/core'
import {MdDatepicker} from '@angular/material'

@Component({
    moduleId: module.id,
    selector: 'navigation',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent implements AfterViewInit {
    @ViewChild(MdDatepicker) checkin: MdDatepicker<Date>;
    @ViewChild(MdDatepicker) checkout: MdDatepicker<Date>;
    
    minBudget = 300;
    maxBudget = 4000;
    value : any = 472;

    minDate = new Date();
    guests: number = 0;
    rooms: number = 0;
    maxRooms: number = 10;
    maxGuests: number = 10;

    updateValue() {
        if(this.value == this.maxBudget) {
            this.value = "unlimited";
        }
    }

    ngAfterViewInit() {}

    openCIDate(){
        this.checkin.open();
    }

    openCODate(){
        this.checkout.open();
    }

    increaseGuests() {
        if(this.guests != this.maxGuests) {
            this.guests = this.guests + 1;
        }
    }

    decreaseGuests() {
        if(this.guests != 0) {
            this.guests = this.guests - 1;
        }
    }

    increaseRooms() {
        if(this.rooms != this.maxRooms) {
            this.rooms = this.rooms + 1;
        }
    }

    decreaseRooms() {
        if(this.rooms != 0) {
            this.rooms = this.rooms - 1;
        }
    }
}