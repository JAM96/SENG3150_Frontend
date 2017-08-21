"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * SERVICE NAME: Data
 * Role: Main purpose of this service will be setting the api location once and allowing multiple services access that url
 * Created by: Jack Mennie
 * Date: 14/08/17
 */
var core_1 = require("@angular/core");
var DataService = (function () {
    function DataService() {
        this.apiUrl = 'http://localhost:8080'; //Api Location
    }
    //apiUrl : string = "http://10.0.0.4:8080";
    //Passes in the service name and returns the full url
    DataService.prototype.getApiUrl = function (service) {
        var url = this.apiUrl;
        //Append the struts action method
        switch (service) {
            case 'accommodation':
                url = url + '/fetchAccommodation';
                break;
            case 'accommodationFeatures':
                url = url + '/fetchAccommodationFeatures';
                break;
            case 'accommodationRooms':
                url = url + '/fetchAccommodationRooms';
                break;
            case 'accommodationRoomFeatures':
                url = url + '/fetchRoomFeatures';
                break;
            case 'activity':
                url = url + '/fetchActivities';
                break;
            case 'food-and-drinks':
                url = url + '/fetchFoodAndDrinks';
                break;
            case 'packages': break;
        }
        console.log(url);
        return url;
    };
    DataService = __decorate([
        core_1.Injectable()
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map