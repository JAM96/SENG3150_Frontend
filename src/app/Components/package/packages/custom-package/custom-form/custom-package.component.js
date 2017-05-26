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
var food_service_1 = require("../../../../../Services/food/food.service");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var CustomPackageComponent = (function () {
    function CustomPackageComponent(hotelService, foodService, slimLoadingBarService) {
        this.hotelService = hotelService;
        this.foodService = foodService;
        this.slimLoadingBarService = slimLoadingBarService;
        //View variables
        this.selected = 3;
        this.days = [1, 2, 3, 4, 5];
        this.selectedDay = 3;
        this.isTrue = false;
        this.screenWidth = document.getElementsByTagName('body')[0].clientWidth;
        this.loaded = false;
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
        this.testString = "hello world";
    }
    CustomPackageComponent.prototype.ngOnInit = function () {
    };
    CustomPackageComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.start(function () {
            console.log('Loading complete');
        });
    };
    CustomPackageComponent.prototype.stopLoading = function () {
        this.slimLoadingBarService.stop();
    };
    CustomPackageComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    CustomPackageComponent.prototype.getHotels = function () {
        var _this = this;
        this.startLoading();
        console.log('retrieving hotels');
        //this.hotelService.getMockHotels().then((hotels: Hotel[]) => this.hotels = hotels);
        this.hotelService.getHotels()
            .subscribe(function (hotel) { return _this.hotels = hotel; });
        // .subscribe(
        //     function(response) {
        //         console.log('Success, response is: ', response); 
        //         (response : Hotel[]) => this.hotels = response;
        //     },
        //     function(error) {
        //         console.log(error)
        //     },
        //     function() {
        //          var cpc : CustomPackageComponent;
        //         console.log('Completed', cpc.testString);
        //         cpc.completeLoading();
        //     });
        //console.log(this.hotels)
        //fake loading bar
        setTimeout(function () {
            _this.completeLoading();
        }, 3000);
    };
    CustomPackageComponent.prototype.getFood = function () {
        var _this = this;
        console.log('retrieving food');
        //this.hotelService.getMockFood().then((food: Food[]) => this.food = food);
        this.startLoading();
        this.foodService.getFood()
            .subscribe(function (food) { return _this.food = food; });
        //fake loading bar
        setTimeout(function () {
            _this.completeLoading();
        }, 1000);
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
        console.log('SELECTED VALUE: ', selection);
        switch (selection) {
            case 1: break;
            case 2:
                this.getHotels();
                break;
            case 3:
                this.getFood();
                break;
            case 4: break;
            case 5: break;
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
        providers: [
            hotel_service_1.HotelService,
            food_service_1.FoodService
        ]
    }),
    __metadata("design:paramtypes", [hotel_service_1.HotelService,
        food_service_1.FoodService,
        ng2_slim_loading_bar_1.SlimLoadingBarService])
], CustomPackageComponent);
exports.CustomPackageComponent = CustomPackageComponent;
//# sourceMappingURL=custom-package.component.js.map