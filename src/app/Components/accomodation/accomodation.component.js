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
//import services
var individual_accommodation_service_1 = require("../../Services/Accommodation/individual-accommodation.service");
var AccomodationComponent = (function () {
    function AccomodationComponent(accommodationService, dialogRef) {
        this.accommodationService = accommodationService;
        this.dialogRef = dialogRef;
        this.title = 'My first AGM project';
        //-32.9252731,151.7734869
        this.lat = -32.9252731;
        this.lng = 151.7734869;
    }
    AccomodationComponent.prototype.ngOnInit = function () {
        this.accommodation = Object.assign({}, this.accommodationService.getAccommodation());
        console.log("Accommodation is loaded: " + this.accommodation.accommodationName);
    };
    return AccomodationComponent;
}());
AccomodationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'accomodation',
        // templateUrl: 'accomodation.component.html',
        templateUrl: 'accomodation.component.html',
        styles: ["agm-map {\n                height: 300px;\n                width: 400px;\n            }"],
    }),
    __metadata("design:paramtypes", [individual_accommodation_service_1.IndividualAccommodationService,
        material_1.MdDialogRef])
], AccomodationComponent);
exports.AccomodationComponent = AccomodationComponent;
//# sourceMappingURL=accomodation.component.js.map