"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var custom_calendar_style_1 = require("./custom-calendar.style");
var CustomCalendarComponent = (function () {
    function CustomCalendarComponent() {
        this.selected = 0;
        this.calendar = [
            //Su    Mo    Tu    We    Th    Fr    Sa
            ['250617', '260617', '270617', '280617', '290617', '300617', '010717'],
            ['020717', '030717', '040717', '050717', '060717', '070717', '080717'],
            ['090717', '100717', '110717', '120717', '130717', '140717', '150717'],
            ['160717', '170717', '180717', '190717', '200717', '210717', '220717'],
            ['230717', '240717', '250717', '260717', '270717', '280717', '290717'],
            ['300717', '310717', '010817', '020817', '030817', '040817', '050817']
        ]; //The calendar array contains the days for easy implementation in the html
        this.month = "July";
        this.year = 2017;
        this.selectedDay = '260717'; //day that is selected.
        this.currentDay = '280717'; //current day
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
    CustomCalendarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'custom-calendar',
            templateUrl: 'custom-calendar.component.html',
            styleUrls: [custom_calendar_style_1.ROW_STYLE]
        })
    ], CustomCalendarComponent);
    return CustomCalendarComponent;
}());
exports.CustomCalendarComponent = CustomCalendarComponent;
//# sourceMappingURL=custom-calendar.component.js.map