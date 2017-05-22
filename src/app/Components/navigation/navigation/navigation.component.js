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
var material_1 = require("@angular/material");
var NavigationComponent = (function () {
    function NavigationComponent() {
        this.minBudget = 300;
        this.maxBudget = 4000;
        this.value = 472;
        this.minDate = new Date();
        this.guests = 0;
        this.rooms = 0;
        this.maxRooms = 10;
        this.maxGuests = 10;
    }
    NavigationComponent.prototype.updateValue = function () {
        if (this.value == this.maxBudget) {
            this.value = "unlimited";
        }
    };
    NavigationComponent.prototype.ngAfterViewInit = function () { };
    NavigationComponent.prototype.openCIDate = function () {
        this.checkin.open();
    };
    NavigationComponent.prototype.openCODate = function () {
        this.checkout.open();
    };
    NavigationComponent.prototype.increaseGuests = function () {
        if (this.guests != this.maxGuests) {
            this.guests = this.guests + 1;
        }
    };
    NavigationComponent.prototype.decreaseGuests = function () {
        if (this.guests != 0) {
            this.guests = this.guests - 1;
        }
    };
    NavigationComponent.prototype.increaseRooms = function () {
        if (this.rooms != this.maxRooms) {
            this.rooms = this.rooms + 1;
        }
    };
    NavigationComponent.prototype.decreaseRooms = function () {
        if (this.rooms != 0) {
            this.rooms = this.rooms - 1;
        }
    };
    return NavigationComponent;
}());
__decorate([
    core_1.ViewChild(material_1.MdDatepicker),
    __metadata("design:type", material_1.MdDatepicker)
], NavigationComponent.prototype, "checkin", void 0);
__decorate([
    core_1.ViewChild(material_1.MdDatepicker),
    __metadata("design:type", material_1.MdDatepicker)
], NavigationComponent.prototype, "checkout", void 0);
NavigationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'navigation',
        templateUrl: 'navigation.component.html'
    })
], NavigationComponent);
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map