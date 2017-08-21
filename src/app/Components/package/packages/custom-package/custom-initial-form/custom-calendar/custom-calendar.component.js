"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var custom_calendar_style_1 = require("./custom-calendar.style");
var CustomCalendarComponent = (function () {
    function CustomCalendarComponent() {
        this._locale = "en-US";
        this.selected = 0;
        this.calendar = [
            //Su    Mo    Tu    We    Th    Fr    Sa
            ['250617', '260617', '270617', '280617', '290617', '300617', '010717'],
            ['020717', '030717', '040717', '050717', '060717', '070717', '080717'],
            ['090717', '100717', '110717', '120717', '130717', '140717', '150717'],
            ['160717', '170717', '180717', '190717', '200717', '210717', '220717'],
            ['230717', '240717', '250717', '260717', '270717', '280717', '290717'],
            ['300717', '310717', '010817', '020817', '030817', '040817', '050817'] // Week 6, will contain next month days
        ]; //The calendar array contains the days for easy implementation in the html
        this.month = "July";
        this.year = 2017;
        this.selectedDay = '260717'; //day that is selected.
        this.currentDay = '280717'; //current day
        this.someDay = new Date('09/21/17');
        this.fillCalendarDays(new Date());
    }
    CustomCalendarComponent.prototype.openMonth = function () {
        this.selected = 1;
    };
    CustomCalendarComponent.prototype.openYear = function () {
        this.selected = 2;
    };
    CustomCalendarComponent.prototype.close = function () {
        this.selected = 0;
    };
    /* sets the month value of the date */
    CustomCalendarComponent.prototype.updateMonth = function (value) {
        switch (value) {
            case 0:
                this.month = "January";
                break;
            case 1:
                this.month = "February";
                break;
            case 2:
                this.month = "March";
                break;
            case 3:
                this.month = "April";
                break;
            case 4:
                this.month = "May";
                break;
            case 5:
                this.month = "June";
                break;
            case 6:
                this.month = "July";
                break;
            case 7:
                this.month = "August";
                break;
            case 8:
                this.month = "September";
                break;
            case 9:
                this.month = "October";
                break;
            case 10:
                this.month = "November";
                break;
            case 11:
                this.month = "December";
                break;
        }
        this.selected = 0;
    };
    /* updates the selected day */
    CustomCalendarComponent.prototype.setDay = function (value) {
        var month = this.extractMiddle(value);
        switch (month) {
            case '01':
                month = "January";
                break;
            case '02':
                month = "February";
                break;
            case '03':
                month = "March";
                break;
            case '04':
                month = "April";
                break;
            case '05':
                month = "May";
                break;
            case '06':
                month = "June";
                break;
            case '07':
                month = "July";
                break;
            case '08':
                month = "August";
                break;
            case '09':
                month = "September";
                break;
            case '10':
                month = "October";
                break;
            case '11':
                month = "November";
                break;
            case '12':
                month = "December";
                break;
        }
        console.log(month);
        if (month != this.month) {
            this.month = month;
        }
        this.selectedDay = value;
    };
    CustomCalendarComponent.prototype.extractMiddle = function (str) {
        var position;
        var length;
        if (str.length % 2 == 1) {
            position = str.length / 2;
            length = 1;
        }
        else {
            position = str.length / 2 - 1;
            length = 2;
        }
        return str.substring(position, position + length);
    };
    /*
        the fill calendar days function will get the selected date and find out the day that corresponds with it
        e.g. 03/08/17 is a thursday
        It will then iterate through a list to ensure that the date '03' is closet to the 42 day array value
        which will be in the calendarDays[1][X] row where X is to be determined
    */
    CustomCalendarComponent.prototype.fillCalendarDays = function (value) {
        var day = this.getDayName(value, this._locale); //get the day from the date, e.g. 'Sunday'
        switch (day) {
            //the switch will then call another function which will populate an array with the neccesary days
            case 'Sunday':
                console.log('value is sunday');
                this.insertIntoArray([0, 7, 14, 21, 28, 35], value); //sunday days occur on the following array inserts
                break;
            case 'Monday':
                console.log('value is mon');
                this.insertIntoArray([1, 8, 15, 22, 29, 36], value);
                break;
            case 'Tuesday':
                console.log('value is tues');
                this.insertIntoArray([2, 9, 16, 23, 30, 37], value);
                break;
            case 'Wednesday':
                console.log('value is wed');
                this.insertIntoArray([3, 10, 17, 24, 31, 38], value);
                break;
            case 'Thursday':
                console.log('value is thur');
                this.insertIntoArray([4, 11, 18, 25, 32, 39], value);
                break;
            case 'Friday':
                console.log('value is fri');
                this.insertIntoArray([5, 12, 19, 26, 33, 40], value);
                break;
            case 'Saturday':
                console.log('value is sat');
                this.insertIntoArray([6, 13, 20, 27, 34, 41], value);
                break;
        }
    };
    CustomCalendarComponent.prototype.insertIntoArray = function (dayValues, dateInsert) {
        var date = dateInsert.getDay();
        var index; //index at where to begin the for loops to fill calendar days
        if (date > 0 && date < 7) {
            //append to row 0
            index = dayValues[0];
        }
        else if (date >= 7 && date < 14) {
            //append to row 1
            index = dayValues[1];
        }
        else if (date >= 14 && date < 21) {
            //append to row 2
            index = dayValues[2];
        }
        else if (date >= 21 && date < 28) {
            //append to row 3
            index = dayValues[3];
        }
        else if (date >= 28) {
            //append to row 4
            index = dayValues[4];
        }
    };
    CustomCalendarComponent.prototype.getDayName = function (date, locale) {
        return date.toLocaleDateString(locale, { weekday: 'long' });
    };
    CustomCalendarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'custom-calendar',
            templateUrl: 'custom-calendar.component.html',
            styleUrls: [custom_calendar_style_1.ROW_STYLE]
        }),
        __metadata("design:paramtypes", [])
    ], CustomCalendarComponent);
    return CustomCalendarComponent;
}());
exports.CustomCalendarComponent = CustomCalendarComponent;
//# sourceMappingURL=custom-calendar.component.js.map