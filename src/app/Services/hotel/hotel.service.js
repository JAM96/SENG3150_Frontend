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
var Mock_Hotel_1 = require("../../Objects/Hotel/MockData/Mock-Hotel");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var HotelService = (function () {
    function HotelService(http) {
        this.http = http;
        this.url = "http://localhost:8080/accommodation";
    }
    HotelService.prototype.getHotels = function () {
        return this.http.get(this.url)
            .map(function (response) { return response.json().result; })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HotelService.prototype.getMockHotels = function () {
        return Promise.resolve(Mock_Hotel_1.HOTEL_LIST);
    };
    return HotelService;
}());
HotelService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HotelService);
exports.HotelService = HotelService;
//# sourceMappingURL=hotel.service.js.map