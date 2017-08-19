"use strict";
/*
 * SERVICE NAME: Food and Drinks
 * Role: Retrieving the Food and drinks data from the backend
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
var mock_food_and_drinks_1 = require("../../Objects/FoodAndDrinks/MockData/mock-food-and-drinks");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var data_service_1 = require("../data.service");
//end imports
var FoodAndDrinksService = (function () {
    function FoodAndDrinksService(http, data) {
        var _this = this;
        this.http = http;
        this.data = data;
        this.fetchFoodAndDrinks().subscribe(function (foodAndDrinks) { return _this.foodAndDrinks = foodAndDrinks; });
    }
    FoodAndDrinksService.prototype.fetchFoodAndDrinks = function () {
        var url = this.data.getApiUrl('food-and-drinks');
        return this.http.get(url)
            .map(function (response) { return response.json().result; })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error: could not retrieve food and drinks'); });
    };
    FoodAndDrinksService.prototype.getMockFood = function () {
        return Promise.resolve(mock_food_and_drinks_1.FOODANDDRINKS_LIST);
    };
    FoodAndDrinksService.prototype.getFoodAndDrinks = function () {
        for (var i = 0; i < this.foodAndDrinks.length; i++) {
            //Set the star array for each foodAndDrinks
            this.foodAndDrinks[i].stars = [];
            for (var j = 0; j < this.foodAndDrinks[i].starRating; j++) {
                this.foodAndDrinks[i].stars[j] = j;
            }
            console.log(this.foodAndDrinks[i].stars);
            //Assign the rating description for each foodAndDrinks
            switch (this.foodAndDrinks[i].userRating) {
                case 1:
                    this.foodAndDrinks[i].rating = "Bad";
                    break;
                case 2:
                    this.foodAndDrinks[i].rating = "Okay";
                    break;
                case 3:
                    this.foodAndDrinks[i].rating = "Good";
                    break;
                case 4:
                    this.foodAndDrinks[i].rating = "Great";
                    break;
                case 5:
                    this.foodAndDrinks[i].rating = "Fabulous!";
                    break;
                default:
                    this.foodAndDrinks[i].rating = "";
                    break;
            }
            //Assign the expense rating description for each foodAndDrinks
            this.foodAndDrinks[i].expense = [];
            for (var e = 0; e < this.foodAndDrinks[i].expenseRating; e++) {
                this.foodAndDrinks[i].expense[e] = e;
            }
            console.log(this.foodAndDrinks[i]);
        }
        return Promise.resolve(this.foodAndDrinks);
    };
    return FoodAndDrinksService;
}());
FoodAndDrinksService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService])
], FoodAndDrinksService);
exports.FoodAndDrinksService = FoodAndDrinksService;
//# sourceMappingURL=food-and-drinks.service.js.map