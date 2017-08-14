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
var accommodation_service_1 = require("../../Services/Accommodation/accommodation.service");
var AccomodationComponent = (function () {
    function AccomodationComponent(accommodationService) {
        this.accommodationService = accommodationService;
    }
    AccomodationComponent.prototype.getAccommodation = function () {
        var _this = this;
        this.accommodationService.getMockAccommodation()
            .then(function (accommodation) { return _this.accommodation = accommodation; });
    };
    return AccomodationComponent;
}());
AccomodationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'accomodation',
        // templateUrl: 'accomodation.component.html',
        templateUrl: 'accomodationListView/accomodationListView.html',
        providers: [accommodation_service_1.AccommodationService]
    }),
    __metadata("design:paramtypes", [accommodation_service_1.AccommodationService])
], AccomodationComponent);
exports.AccomodationComponent = AccomodationComponent;
//# sourceMappingURL=accomodation.component.js.map