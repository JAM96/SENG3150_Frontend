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
    }
    return CustomCalendarComponent;
}());
CustomCalendarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'custom-calendar',
        templateUrl: 'custom-calendar.component.html',
    })
], CustomCalendarComponent);
exports.CustomCalendarComponent = CustomCalendarComponent;
//# sourceMappingURL=custom-calendar.component.js.map