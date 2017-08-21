"use strict";
/*
 * SERVICE NAME: Accommodation
 * Role: Retrieving the accommodation data from the backend
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
var Mock_Accommodation_1 = require("../../Objects/Accommodation/MockData/Mock-Accommodation");
var data_service_1 = require("../data.service");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
//end imports
var AccommodationService = (function () {
    function AccommodationService(http, data) {
        var _this = this;
        this.http = http;
        this.data = data;
        console.log("Fectching from the database");
        this.fetchAccommodation().subscribe(function (accommodation) { return _this.accommodation = accommodation; });
        this.fetchAccommodationFeatures().subscribe(function (feature) { return _this.accommodationFeatures = feature; });
        this.fetchAccommodationRooms().subscribe(function (room) { return _this.accommodationRooms = room; });
        this.fetchAccommodationRoomFeatures().subscribe(function (roomFeature) { return _this.accommodationRoomFeatures = roomFeature; });
        console.log("DONE");
    }
    AccommodationService.prototype.ngOnInit = function () {
    };
    AccommodationService.prototype.fetchAccommodation = function () {
        var url = this.data.getApiUrl('accommodation');
        return this.http.get(url)
            .map(function (response) { return response.json().result; })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Could not retrieve Accommodation'); });
    };
    AccommodationService.prototype.fetchAccommodationFeatures = function () {
        var url = this.data.getApiUrl('accommodationFeatures');
        return this.http.get(url)
            .map(function (response) { return response.json().result; })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Could not retrieve Accommodation features'); });
    };
    AccommodationService.prototype.fetchAccommodationRooms = function () {
        var url = this.data.getApiUrl('accommodationRooms');
        return this.http.get(url)
            .map(function (response) { return response.json().result; })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Could not retrieve Accommodatio rooms'); });
    };
    AccommodationService.prototype.fetchAccommodationRoomFeatures = function () {
        var url = this.data.getApiUrl('accommodationRoomFeatures');
        return this.http.get(url)
            .map(function (response) { return response.json().result; })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Could not retrieve room features'); });
    };
    AccommodationService.prototype.getAccommodation = function () {
        console.log('Returning accommodation promise' + this.accommodation);
        for (var i = 0; i < this.accommodation.length; i++) {
            //Set the star array for each accommodation
            this.accommodation[i].accommodationStars = [];
            for (var j = 0; j < this.accommodation[i].accommodationStarRating; j++) {
                this.accommodation[i].accommodationStars[j] = j;
            }
            console.log(this.accommodation[i].accommodationStars);
            //Assign the rating description for each accommodation
            switch (this.accommodation[i].accommodationUserRating) {
                case 1:
                    this.accommodation[i].accommodationRating = "Bad";
                    break;
                case 2:
                    this.accommodation[i].accommodationRating = "Okay";
                    break;
                case 3:
                    this.accommodation[i].accommodationRating = "Good";
                    break;
                case 4:
                    this.accommodation[i].accommodationRating = "Great";
                    break;
                case 5:
                    this.accommodation[i].accommodationRating = "Fabulous!";
                    break;
                default:
                    this.accommodation[i].accommodationRating = "";
                    break;
            }
        }
        this.assign();
        this.getCheapestPrice();
        return Promise.resolve(this.accommodation);
    };
    AccommodationService.prototype.getAccommodationFeatures = function () {
        console.log(this.accommodationFeatures);
        return Promise.resolve(this.accommodationFeatures);
    };
    AccommodationService.prototype.getAccommodationRooms = function () {
        return Promise.resolve(this.accommodationRooms);
    };
    AccommodationService.prototype.getAccommodationRoomFeatures = function () {
        return Promise.resolve(this.accommodationRoomFeatures);
    };
    AccommodationService.prototype.getMockAccommodation = function () {
        return Promise.resolve(Mock_Accommodation_1.ACCOMMODATION_LIST);
    };
    //Accommodation Features and rooms assigning
    AccommodationService.prototype.assign = function () {
        console.log("Assigning module: ");
        for (var i = 0; i < this.accommodation.length; i++) {
            //initialise features and room of each accommodation
            this.accommodation[i].features = [];
            this.accommodation[i].room = [];
            console.log("initialising done, now assiging features");
            //Assign Features to the accommodation
            for (var j = 0; j < this.accommodationFeatures.length; j++)
                if (this.accommodation[i].accommodationID == this.accommodationFeatures[j].accommodationID)
                    this.accommodation[i].features.push(this.accommodationFeatures[j]);
            //Assign rooms to the accommodation
            console.log("now assigning rooms");
            for (var j = 0; j < this.accommodationRooms.length; j++)
                if (this.accommodation[i].accommodationID == this.accommodationRooms[j].accommodationID)
                    this.accommodation[i].room.push(this.accommodationRooms[j]);
        }
        console.log(this.accommodation);
    };
    AccommodationService.prototype.getCheapestPrice = function () {
        console.log("finding cheapest price");
        for (var i = 0; i < this.accommodation.length; i++) {
            if (this.accommodation[i].room[0] != null) {
                console.log("Room price for 0 is defined");
                var price = this.accommodation[i].room[0].roomPrice;
                for (var j = 0; j < this.accommodation[i].room.length; j++) {
                    if (price <= this.accommodation[i].room[j].roomPrice) {
                        price = this.accommodation[i].room[j].roomPrice;
                        break;
                    }
                }
                this.accommodation[i].pricePerNight = price;
            }
            else {
                this.accommodation[i].pricePerNight = 0;
            }
        }
    };
    AccommodationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService])
    ], AccommodationService);
    return AccommodationService;
}());
exports.AccommodationService = AccommodationService;
//# sourceMappingURL=accommodation.service.js.map