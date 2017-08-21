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
var individual_food_and_drinks_service_1 = require("../../Services/FoodAndDrinks/individual-food-and-drinks.service");
var FoodAndDrinksComponent = (function () {
    function FoodAndDrinksComponent(foodAndDrinksService, dialogRef) {
        this.foodAndDrinksService = foodAndDrinksService;
        this.dialogRef = dialogRef;
    }
    FoodAndDrinksComponent.prototype.ngOnInit = function () {
        this.foodAndDrinks = Object.assign({}, this.foodAndDrinksService.getFoodAndDrinks());
        console.log("foodAndDrinks is loaded: " + this.foodAndDrinks.name);
    };
    FoodAndDrinksComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'food-and-drinks',
            templateUrl: 'food-and-drinks.component.html',
            styles: [],
        }),
        __metadata("design:paramtypes", [individual_food_and_drinks_service_1.IndividualFoodAndDrinksService,
            material_1.MdDialogRef])
    ], FoodAndDrinksComponent);
    return FoodAndDrinksComponent;
}());
exports.FoodAndDrinksComponent = FoodAndDrinksComponent;
//# sourceMappingURL=food-and-drinks.component.js.map