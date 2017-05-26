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
//import services
var hotel_service_1 = require("../../../../../Services/hotel/hotel.service");
var CustomPackageComponent = (function () {
    function CustomPackageComponent(hotelService) {
        this.hotelService = hotelService;
        //
        this.selected = 3;
        this.days = [1, 2, 3, 4, 5];
        this.selectedDay = 3;
        //travel form
        this.travelSubmitted = false;
        this.travelValue = 'No';
        this.travelOptions = ['Yes', 'No'];
        //travel form
        this.accommodationValue = 'No';
        this.accommodationOptions = ['Yes', 'No'];
        //food form
        this.displayB = 'none';
        this.displayL = 'none';
        this.displayD = 'none';
        this.displayO = 'none';
    }
    CustomPackageComponent.prototype.ngOnInit = function () {
    };
    CustomPackageComponent.prototype.getHotels = function () {
        var _this = this;
        console.log('retrieving hotels');
        //this.hotelService.getMockHotels().then((hotels: Hotel[]) => this.hotels = hotels);
        this.hotelService.getHotels()
            .subscribe(function (hotel) { return _this.hotels = hotel; }, function (err) { console.log(err); });
    };
    //Navigation
    CustomPackageComponent.prototype.prevForm = function () {
        if (this.selected != 1) {
            this.setNavigation(this.selected - 1);
            console.info(this.selected);
        }
    };
    CustomPackageComponent.prototype.nextForm = function () {
        if (this.selected != 5) {
            this.setNavigation(this.selected + 1);
            console.info(this.selected);
        }
    };
    CustomPackageComponent.prototype.setNavigation = function (selection) {
        this.selected = selection;
        switch (selection) {
            case 1:
            case 2: this.getHotels();
            case 3:
            case 4:
            case 5:
        }
    };
    CustomPackageComponent.prototype.setDays = function (selection) {
        this.selectedDay = selection;
    };
    CustomPackageComponent.prototype.expandB = function () {
        if (this.displayB == 'none') {
            this.displayB = 'block';
        }
        else {
            this.displayB = 'none';
        }
    };
    CustomPackageComponent.prototype.expandL = function () {
        if (this.displayL == 'none') {
            this.displayL = 'block';
        }
        else {
            this.displayL = 'none';
        }
    };
    CustomPackageComponent.prototype.expandD = function () {
        if (this.displayD == 'none') {
            this.displayD = 'block';
        }
        else {
            this.displayD = 'none';
        }
    };
    CustomPackageComponent.prototype.expandO = function () {
        if (this.displayO == 'none') {
            this.displayO = 'block';
        }
        else {
            this.displayO = 'none';
        }
    };
    return CustomPackageComponent;
}());
CustomPackageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'custom-package',
        templateUrl: 'custom-package.component.html',
        providers: [hotel_service_1.HotelService]
    }),
    __metadata("design:paramtypes", [hotel_service_1.HotelService])
], CustomPackageComponent);
exports.CustomPackageComponent = CustomPackageComponent;
//# sourceMappingURL=custom-package.component.js.map