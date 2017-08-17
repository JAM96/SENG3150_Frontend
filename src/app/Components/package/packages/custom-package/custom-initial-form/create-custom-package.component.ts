import {Component, ViewChild, AfterViewInit, Input} from '@angular/core'
import {MdDatepicker, MdDialog} from '@angular/material'
import {Router} from '@angular/router'
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';

import {CustomPackageService} from '../custom-package-service/custom-package.service';

// import slide in/out animation
import { slideInOutAnimation } from '../../../../_animations';

@Component({
    moduleId: module.id,
    selector: 'initial-custom-form',
    templateUrl: 'create-custom-package.component.html',
    // make slide in/out animation available to this component
    animations: [slideInOutAnimation],
 
    // attach the slide in/out animation to the host (root) element of this component
    host: { '[@slideInOutAnimation]': '' }
})

export class CreateCustomPackageInitialComponent { //CCPIC
    selectedOption : number = 1;    //defines the selected option
    minBudget = 300;        //define minimum budget value
    maxBudget = 4000;       //define maximum budget value
    minDate = new Date();   //used to prevent previous dates to the current date being selected
    maxRooms: number = 10;  //Maximum rooms the user can book. 
    maxGuests: number = 10; //Maximum guests user wants to book. 

    //form data
    value : any = 472;      //budget value set at $472
    guests: number = 1;     //guests value set at 1, This will show all accomodation with X+ rooms
    rooms: number = 1;      //rooms value set at 1 This will show all room capable of providing X+ guests
    checkin : Date;         //Date when user wants to have their holiday
    checkout: Date;         //Date when user wants to end their holiday

    //CCPIC Constructor with instantiates the router and custom-package services
    constructor (
        public router: Router,
        private packageService: CustomPackageService
        ) {}

    private myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        showApplyBtn: false,
        showClearBtn: false,
        firstDayOfWeek: "su",
        sunHighlight: false,
        minYear: 2017,
        maxYear: 3000,
        height: '34px',
        width: '260px',
        inline: false,
        editableDateRangeField: false,
        alignSelectorRight: false,
        indicateInvalidDateRange: true,

    };

    // For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
    // to set initial date range value using the selDateRange attribute.
    private model: Object = {beginDate: {year: 2017, month: 8, day: 7},
                             endDate: {year: 2017, month: 8, day: 7}};

     onDateRangeChanged(event: IMyDateRangeModel) {
        console.log('onDateRangeChanged(): Begin date: ', event.beginDate, ' End date: ', event.endDate);
        console.log('onDateRangeChanged(): Formatted: ', event.formatted);
        console.log('onDateRangeChanged(): BeginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);
        
        //console log of javascript date
        console.log('JS Start Date: ', event.beginJsDate);
        console.log('JS End Date: ', event.endJsDate);

        this.checkin = event.beginJsDate;
        this.checkout = event.endJsDate;
    }

    //Following methods increase or decreases the numbers of guests or rooms.
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

    //Submit form will output a log for debugging purposes
    //Send the data to the custom-package service
    //Navigate to the next page
    submitForm() {
        console.log(this.checkin);

        if(this.validateForm()) { 
            this.sendLog();

            this.packageService.setInitialData(
                this.value,
                this.guests,
                this.rooms,
                this.checkin,
                this.checkout,
                );
            this.router.navigate(["/createpackage"]);
        } 
    }


/*FORM VALIDATION, COMMENTED FOR EASY DEV */
    validateForm() {/*
        if(this.checkin == null) {
            window.alert("You must enter a checkin date!");
            return false;
        }

        if(this.checkout == null) {
            window.alert("You must enter a checkout date!");
            return false;
        }

        if(this.checkout < this.checkin) {
            window.alert("Your checkout date cannot be before checkin!");
            return false;
        }*/

        return true;
    }

    sendLog() {
        console.info("[INFO] Submitting form: ");
        console.info("       Budget: ", this.value);
        console.info("       Guests", this.guests);
        console.info("       Rooms: ", this.rooms);
        console.info("       Checkin: ", this.checkin);
        console.info("       Checkout: ", this.checkout);
        console.info("[INFO] Loading custom page...");
    }

    setNavOption(selection : number) {
        this.selectedOption = selection;

        switch(this.selectedOption) {
            case 1: this.router.navigate(['/packages']);            break;
            case 2: ;        break; 
            case 3: this.router.navigate(['/about']);          break;
            case 4: this.router.navigate(['/accommodation']); break;
            case 5: this.router.navigate(['/events']); break;
            case 6: this.router.navigate(['/activities']); break;
            case 7: this.router.navigate(['/food']); break;
        }
    }
}