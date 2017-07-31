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
var router_1 = require("@angular/router");
var custom_package_service_1 = require("../custom-package-service/custom-package.service");
// import slide in/out animation
var _animations_1 = require("../../../../_animations");
var CreateCustomPackageInitialComponent = (function () {
    //CCPIC Constructor with instantiates the router and custom-package services
    function CreateCustomPackageInitialComponent(router, packageService) {
        this.router = router;
        this.packageService = packageService;
        this.selectedOption = 1; //defines the selected option
        this.minBudget = 300; //define minimum budget value
        this.maxBudget = 4000; //define maximum budget value
        this.minDate = new Date(); //used to prevent previous dates to the current date being selected
        this.maxRooms = 10; //Maximum rooms the user can book. 
        this.maxGuests = 10; //Maximum guests user wants to book. 
        //form data
        this.value = 472; //budget value set at $472
        this.guests = 1; //guests value set at 1, This will show all accomodation with X+ rooms
        this.rooms = 1; //rooms value set at 1 This will show all room capable of providing X+ guests
    }
    /* TODO:
        This needs to be optomised since this current implementation does not update budget to unlimited.
    */
    CreateCustomPackageInitialComponent.prototype.updateValue = function () {
        if (this.value == this.maxBudget) {
            this.value = "unlimited";
        }
    };
    //Following methods increase or decreases the numbers of guests or rooms.
    CreateCustomPackageInitialComponent.prototype.increaseGuests = function () {
        if (this.guests != this.maxGuests) {
            this.guests = this.guests + 1;
        }
    };
    CreateCustomPackageInitialComponent.prototype.decreaseGuests = function () {
        if (this.guests != 1) {
            this.guests = this.guests - 1;
        }
    };
    CreateCustomPackageInitialComponent.prototype.increaseRooms = function () {
        if (this.rooms != this.maxRooms) {
            this.rooms = this.rooms + 1;
        }
    };
    CreateCustomPackageInitialComponent.prototype.decreaseRooms = function () {
        if (this.rooms != 1) {
            this.rooms = this.rooms - 1;
        }
    };
    //Submit form will output a log for debugging purposes
    //Send the data to the custom-package service
    //Navigate to the next page
    CreateCustomPackageInitialComponent.prototype.submitForm = function () {
        if (this.validateForm()) {
            this.sendLog();
            this.packageService.setInitialData(this.value, this.guests, this.rooms, this.checkin, this.checkout);
            this.router.navigate(["/createpackage"]);
        }
    };
    /*FORM VALIDATION, COMMENTED FOR EASY DEV */
    CreateCustomPackageInitialComponent.prototype.validateForm = function () {
        return true;
    };
    CreateCustomPackageInitialComponent.prototype.sendLog = function () {
        console.info("[INFO] Submitting form: ");
        console.info("       Budget: ", this.value);
        console.info("       Guests", this.guests);
        console.info("       Rooms: ", this.rooms);
        console.info("       Checkin: ", this.checkin);
        console.info("       Checkout: ", this.checkout);
        console.info("[INFO] Loading custom page...");
    };
    CreateCustomPackageInitialComponent.prototype.setNavOption = function (selection) {
        this.selectedOption = selection;
        switch (this.selectedOption) {
            case 1:
                this.router.navigate(['/packages']);
                break;
            case 2:
                ;
                break;
            case 3:
                this.router.navigate(['/about']);
                break;
        }
    };
    CreateCustomPackageInitialComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'initial-custom-form',
            templateUrl: 'create-custom-package.component.html',
            // make slide in/out animation available to this component
            animations: [_animations_1.slideInOutAnimation],
            // attach the slide in/out animation to the host (root) element of this component
            host: { '[@slideInOutAnimation]': '' }
        }),
        __metadata("design:paramtypes", [router_1.Router,
            custom_package_service_1.CustomPackageService])
    ], CreateCustomPackageInitialComponent);
    return CreateCustomPackageInitialComponent;
}());
exports.CreateCustomPackageInitialComponent = CreateCustomPackageInitialComponent;
//# sourceMappingURL=create-custom-package.component.js.map