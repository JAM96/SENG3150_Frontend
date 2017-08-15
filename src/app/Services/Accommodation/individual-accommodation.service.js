"use strict";
/*
 * SERVICE NAME: Accommodation
 * Role: Storing and sending one accommodation through components
 * Created By: Jack Mennie
 * Date Completed: 14/08/17
 */
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
//Imports
var core_1 = require("@angular/core");
var Accommodation_1 = require("../../Objects/Accommodation/Accommodation");
//end imports
var IndividualAccommodationService = (function () {
    function IndividualAccommodationService() {
        console.log("I AM IN THE INDI ACCOMMODATION SERVICE");
    }
    IndividualAccommodationService.prototype.setAccommodation = function (acc) {
        var data = new Accommodation_1.Accommodation;
        console.log("Imported accommodation is: ");
        console.log(acc);
        data = acc;
        this.accommodation = data;
        console.log("Accommodation has been set: ");
        console.log(this.accommodation);
    };
    IndividualAccommodationService.prototype.getAccommodation = function () {
        console.log("Returning accommodation object");
        console.log(this.accommodation);
        return this.accommodation;
    };
    ;
    return IndividualAccommodationService;
}());
IndividualAccommodationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], IndividualAccommodationService);
exports.IndividualAccommodationService = IndividualAccommodationService;
//# sourceMappingURL=individual-accommodation.service.js.map