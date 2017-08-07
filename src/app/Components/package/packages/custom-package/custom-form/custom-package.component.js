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
var activity_service_1 = require("../../../../../Services/activity/activity.service");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var custom_package_service_1 = require("../custom-package-service/custom-package.service");
var router_1 = require("@angular/router");
var CustomPackageComponent = (function () {
    function CustomPackageComponent(hotelService, foodService, activityService, packageService, slimLoadingBarService, router) {
        this.hotelService = hotelService;
        this.foodService = foodService;
        this.activityService = activityService;
        this.packageService = packageService;
        this.slimLoadingBarService = slimLoadingBarService;
        this.router = router;
        //View variables
        this.selected = 1;
        this.days = [];
        this.selectedDay = 1;
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
    }
    CustomPackageComponent.prototype.ngOnInit = function () {
        this.custom = this.packageService.getInitialData();
        this.custom.checkin = new Date('February 4, 2016 10:13:00');
        this.custom.checkout = new Date('February 6, 2016 10:13:00');
        console.log(this.custom.checkin);
        this.calculateDuration(this.custom.checkin, this.custom.checkout);
        this.setDaysArray(this.duration);
    };
    //Calculates the duration of the selected holiday
    CustomPackageComponent.prototype.calculateDuration = function (checkin, checkout) {
        var check = new Date(checkin);
        if (checkin == null) {
            this.router.navigate(["/home"]);
        }
        var one_day = 1000 * 60 * 60 * 24; //used to convert the time calculated into days
        console.log(new Date(checkout));
        console.log(new Date(checkin));
        var duration = new Date(checkout).getTime() - new Date(checkin).getTime();
        this.duration = Math.round(duration / one_day);
    };
    /* Assigns each day to the days array
        This is required since angular cannot pass in a value in the *ngFor
          e.g cannot do *ngFor="let x = 1; x <= duration ..."
          ngFor can only loop through arrays.
    */
    CustomPackageComponent.prototype.setDaysArray = function (duration) {
        console.log(duration);
        for (var i = 1; i <= duration; i++) {
            this.days.push(i);
        }
        console.log(this.days);
    };
    //fake loading atm
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
    /* Retrieves all the hotel objects from the backend */
    CustomPackageComponent.prototype.getHotels = function () {
        var _this = this;
        console.log('retrieving hotels');
        this.startLoading();
        //this.hotelService.getMockHotels().then((hotels: Hotel[]) => this.hotels = hotels);
        this.hotelService.getHotels()
            .subscribe(function (hotel) { return _this.hotels = hotel; });
        //Another way of doing this but does not currently work
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
        }, 1000);
    };
    /* Retrieves all food objects from the backend */
    CustomPackageComponent.prototype.getFood = function () {
        var _this = this;
        console.log('retrieving food');
        //this.foodService.getMockFood().then((food: Food[]) => this.food = food);
        this.startLoading();
        this.foodService.getFood()
            .subscribe(function (food) { return _this.food = food; });
        //fake loading bar
        setTimeout(function () {
            _this.completeLoading();
        }, 1000);
    };
    /* Retrieves all activity objects from the backend */
    CustomPackageComponent.prototype.getActivities = function () {
        var _this = this;
        console.log('retrieving Activities');
        //this.activityService.getMockActivities().then((activity: Activity[]) => this.activities = activity);
        this.startLoading();
        this.activityService.getActivities()
            .subscribe(function (activity) { return _this.activities = activity; });
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
            case 4:
                this.getActivities();
                break;
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
    // setTravelValue(selection : boolean) {
    //     this.travelValue = selection;
    // }
    /* Item Selection */
    CustomPackageComponent.prototype.addHotel = function (accID, accName) {
        alert('You have selected: \n Item ID: ' + accID + '\n Name: ' + accName);
        this.custom.hotel = accName;
        this.selectedAccommodation = accID;
        console.info('[INFO] Added ', this.custom.hotel, ' to cart.');
    };
    CustomPackageComponent.prototype.setFood = function (menuType, item, setForAll) {
        var day = this.selectedDay;
        switch (menuType) {
            case 1:
                console.log('Setting food with the following: ');
                console.log(' - Time of Day: ', menuType);
                console.log(' - Day: ', this.selectedDay);
                console.log(' - Item: ', item);
                console.log(' - Set all: ', setForAll);
                //This checks if items have been added into the breakfast array yet
                if (this.custom.foodBreakfast == null) {
                    this.custom.foodBreakfast = [];
                    for (var i = 1; i <= this.duration; i++) {
                        this.custom.foodBreakfast.push('');
                    }
                    console.log(this.custom.foodBreakfast);
                    if (!setForAll) {
                        this.custom.foodBreakfast[day - 1] = item;
                    }
                    else {
                        for (var i = 0; i < this.duration; i++) {
                            this.custom.foodBreakfast[i] = item;
                        }
                    }
                    console.log(this.custom.foodBreakfast);
                }
                else {
                    if (!setForAll) {
                        this.custom.foodBreakfast[day - 1] = item;
                    }
                    else {
                        for (var i = 0; i < this.duration; i++) {
                            this.custom.foodBreakfast[i] = item;
                        }
                    }
                    console.log(this.custom.foodBreakfast);
                }
                break;
            case 2:
                //This checks if items have been added into the Lunch array yet
                if (this.custom.foodLunch == null) {
                    this.custom.foodLunch = [];
                    for (var i = 1; i <= this.duration; i++) {
                        this.custom.foodLunch.push('');
                    }
                    console.log(this.custom.foodLunch);
                    if (!setForAll) {
                        this.custom.foodLunch[day - 1] = item;
                    }
                    else {
                        for (var i = 0; i < this.duration; i++) {
                            this.custom.foodLunch[i] = item;
                        }
                    }
                    console.log(this.custom.foodLunch);
                }
                else {
                    if (!setForAll) {
                        this.custom.foodLunch[day - 1] = item;
                    }
                    else {
                        for (var i = 0; i < this.duration; i++) {
                            this.custom.foodLunch[i] = item;
                        }
                    }
                    console.log(this.custom.foodLunch);
                }
                break;
            case 3:
                //This checks if items have been added into the Dinner array yet
                if (this.custom.foodDinner == null) {
                    this.custom.foodDinner = [];
                    for (var i = 1; i <= this.duration; i++) {
                        this.custom.foodDinner.push('');
                    }
                    console.log(this.custom.foodDinner);
                    if (!setForAll) {
                        this.custom.foodDinner[day - 1] = item;
                    }
                    else {
                        for (var i = 0; i < this.duration; i++) {
                            this.custom.foodDinner[i] = item;
                        }
                    }
                    console.log(this.custom.foodDinner);
                }
                else {
                    if (!setForAll) {
                        this.custom.foodDinner[day - 1] = item;
                    }
                    else {
                        for (var i = 0; i < this.duration; i++) {
                            this.custom.foodDinner[i] = item;
                        }
                    }
                    console.log(this.custom.foodDinner);
                }
                break;
            case 4:
                //This checks if items have been added into the Other array yet
                if (this.custom.foodOther == null) {
                    this.custom.foodOther = [];
                    for (var i = 1; i <= this.duration; i++) {
                        this.custom.foodOther.push('');
                    }
                    console.log(this.custom.foodOther);
                    if (!setForAll) {
                        this.custom.foodOther[day - 1] = item;
                    }
                    else {
                        for (var i = 0; i < this.duration; i++) {
                            this.custom.foodOther[i] = item;
                        }
                    }
                    console.log(this.custom.foodOther);
                }
                else {
                    if (!setForAll) {
                        this.custom.foodOther[day - 1] = item;
                    }
                    else {
                        for (var i = 0; i < this.duration; i++) {
                            this.custom.foodOther[i] = item;
                        }
                    }
                    console.log(this.custom.foodOther);
                }
                break;
        }
    };
    CustomPackageComponent.prototype.canDeactivate = function () {
        console.log('i am navigating away');
        console.log(this.custom.checkin);
        //check if user wants to navigate away
        if (this.custom.checkin != null) {
            return window.confirm("You will lose all changes and will have to start again. Are you sure you want to continue?");
        }
        else {
            return true;
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
            food_service_1.FoodService,
            activity_service_1.ActivityService
        ]
    }),
    __metadata("design:paramtypes", [hotel_service_1.HotelService,
        food_service_1.FoodService,
        activity_service_1.ActivityService,
        custom_package_service_1.CustomPackageService,
        ng2_slim_loading_bar_1.SlimLoadingBarService,
        router_1.Router])
], CustomPackageComponent);
exports.CustomPackageComponent = CustomPackageComponent;
//# sourceMappingURL=custom-package.component.js.map