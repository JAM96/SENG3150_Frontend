"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CustomCalendarComponent = (function () {
    function CustomCalendarComponent() {
        this.selected = 0;
        this.days = ['25', '26', '27', '28', '29', '30', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23',
            '24', '25', '26', '27', '28', '29', '30', '31', '01', '02', '03', '04', '05'];
        this.month = "July";
        this.selectedDay = 26; //day that is selected.
        this.currentDay = 28; //current day
        this.calendarday = 'normal';
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
        this.selectedDay = value;
    };
    return CustomCalendarComponent;
}());
CustomCalendarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'custom-calendar',
        templateUrl: 'custom-calendar.component.html',
        styleUrls: ['custom-calendar.component.css']
    })
], CustomCalendarComponent);
exports.CustomCalendarComponent = CustomCalendarComponent;
//# sourceMappingURL=custom-calendar.component.js.map