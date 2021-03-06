import {Component} from '@angular/core'
import {MdDatepicker, MdDialog, MdTooltipModule} from '@angular/material'
import {Router} from '@angular/router'
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import {CustomPackageService} from '../../Services/Package/custom-package.service';
import {DataService} from '../../Services/data.service'

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
})

export class HomeComponent{
    position = 'below';     //defines the position of the tooltip
    maxRooms: number = 10;  //Maximum rooms the user can book. 
    maxGuests: number = 10; //Maximum guests user wants to book. 

    //form data
    value : any = 112;      //budget value set at $472
    guests: number = 1;     //guests value set at 1, This will show all accomodation with X+ rooms
    rooms: number = 1;      //rooms value set at 1 This will show all room capable of providing X+ guests
    checkin : Date;         //Date when user wants to have their holiday
    checkout: Date;         //Date when user wants to end their holiday

    //date data
        date : Date = new Date();   //get the current date
        //The begin day, month and year will determine the disabled dates
        beginYear   : number = this.date.getFullYear();
        beginMonth  : number = this.date.getMonth() + 1;
        beginDay    : number = this.date.getDate() - 1;
        //The end year will prevent users from selecting a date that is too long away
        endYear     : number = this.beginYear + 10;

    //CCPIC Constructor with instantiates the router and custom-package services
    constructor (
        public router: Router,
        private packageService: CustomPackageService,
        public data : DataService,
        ) {
            data.setNavigation(1);
        }

    myDateRangePickerOptions: IMyDrpOptions = {
        //Options provided from documentation
        dayLabels: {su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'},
        monthLabels: { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' },
        dateFormat: 'dd.mm.yyyy',  
        showClearBtn: false,
        showApplyBtn: false,
        showSelectDateText: false,
        selectBeginDateTxt: 'Checkin',
        selectEndDateTxt: 'Checkout',
        firstDayOfWeek: "su",
        sunHighlight: false,
        markCurrentDay: true,
        markCurrentMonth: true,
        markCurrentYear: true,
        monthSelector: true,
        yearSelector: true,
        minYear: this.beginYear,
        maxYear: this.endYear,
        disableUntil: {year: this.beginYear, month:this.beginMonth, day:this.beginDay},     //disable dates before this value
        disableSince: {year: this.endYear, month:this.beginMonth, day: this.beginDay},  //disable dates after this value
        //disableDates: no default value, //Array<IMyDate> list of disabled dates
        //enableDates: no default value, //Array<IMyDate> list of enabled dates
        //disableDateRanges: no default value, //Array<IMyDate> is in range but cannot be selected
        disableHeaderButtons: true,
        showWeekNumbers: false,
        selectorHeight: '232px',
        selectorWidth: '100%',
        inline: false,  //shows the calendar selection
        showClearDateRangeBtn: false,
        height: '34px',
        width: '100%',
        selectionTxtFontSize: '16px',
        alignSelectorRight: false, 
        indicateInvalidDateRange: true, 
        componentDisabled: false,
        editableDateRangeField: false, //disables manual input
        showSelectorArrow: true,
        openSelectorOnInputClick: true,
        ariaLabelInputField: "Chose when you are having your holiday",
        ariaLabelOpenCalendar: "HEI"
    };

    // For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
    // to set initial date range value using the selDateRange attribute.
    //model: Object = {beginDate: {year: 2017, month: 8, day: 7},
     //                        endDate: {year: 2017, month: 8, day: 7}};

     onDateRangeChanged(event: IMyDateRangeModel) {
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
            //this.sendLog();

            this.packageService.setInitialPackageData(
                this.value,
                this.guests,
                this.rooms,
                this.checkin,
                this.checkout,
                );
            this.router.navigate(["/createpackage"]);
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

    setNavOption(selection : string) {

        switch(selection) {
            case 'packages'     : this.router.navigate(['/packages']);        break;
            case 'login'        : ;        break; 
            case 'about'        : this.router.navigate(['/about']);           break;
            case 'accommodation': this.router.navigate(['/accommodation']);   break;
            case 'events'       : this.router.navigate(['/events']);          break;
            case 'activities'   : this.router.navigate(['/activities']);      break;
            case 'restaurants'  : this.router.navigate(['/food-and-drinks']); break;
        }
    }
}