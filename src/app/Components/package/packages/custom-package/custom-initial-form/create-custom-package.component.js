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
var CreateCustomPackageInitialComponent = (function () {
    function CreateCustomPackageInitialComponent(router, packageService) {
        this.router = router;
        this.packageService = packageService;
        this.minBudget = 300;
        this.maxBudget = 4000;
        //form data
        this.value = 472;
        this.guests = 1;
        this.rooms = 1;
        this.minDate = new Date();
        this.maxRooms = 10;
        this.maxGuests = 10;
    }
    CreateCustomPackageInitialComponent.prototype.sendLog = function () {
        console.log("Outputting Output:::");
        console.log("   Budget: ", this.value);
        console.log("   Guests", this.guests);
        console.log("   Rooms: ", this.rooms);
        console.log("   checkin: ", this.checkin);
        console.log("   checkout: ", this.checkout);
        console.log("-- Log Complete");
    };
    CreateCustomPackageInitialComponent.prototype.submitForm = function () {
        console.log('budget: ', this.value);
        this.packageService.setInitialData(this.value, this.guests, this.rooms, this.checkin, this.checkout);
        this.router.navigate(["/createpackage"]);
    };
    CreateCustomPackageInitialComponent.prototype.updateValue = function () {
        if (this.value == this.maxBudget) {
            this.value = "unlimited";
        }
    };
    CreateCustomPackageInitialComponent.prototype.ngAfterViewInit = function () { };
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
    return CreateCustomPackageInitialComponent;
}());
CreateCustomPackageInitialComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'initial-custom-form',
        templateUrl: 'create-custom-package.component.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        custom_package_service_1.CustomPackageService])
], CreateCustomPackageInitialComponent);
exports.CreateCustomPackageInitialComponent = CreateCustomPackageInitialComponent;
//# sourceMappingURL=create-custom-package.component.js.map