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
        this.isLoaded = [
            { type: 'accommodation', value: false },
            { type: 'restauarants', value: false },
            { type: 'activities', value: false },
        ];
        //View variables
        this.selected = 1; //Tab selection, 1=Travel, 2=Accommodation, 3=Restauarants, 4=Activities, 5=Cart
        //Restaurants and Activities View
        this.days = []; //Used to store the amount of days the user is staying
        this.selectedDay = 1; //The day that has been selected for input of the package item
        //Side menu
        this.isTrue = false; //Depending on the screen size, if the user is on a computer, it will be opened
        this.screenWidth = document.getElementsByTagName('body')[0].clientWidth; //calculate the users screen width
        //Travel Form
        this.travelValue = 'No'; //Option selected by the user
        this.travelOptions = ['Yes', 'No']; //List of available travel options
        //Food and Drinks Form
        this.foodForm = [
            { display: 'displayB', condition: 'none', value: 1, eatingTime: 'Breakfast' },
            { display: 'displayL', condition: 'none', value: 2, eatingTime: 'Lunch' },
            { display: 'displayD', condition: 'none', value: 3, eatingTime: 'Dinner' },
            { display: 'displayO', condition: 'none', value: 4, eatingTime: 'Other' }
        ]; // this object will be in charge of iterating through the four times for food.
    }
    CustomPackageComponent.prototype.ngOnInit = function () {
        console.log('[INFO] Custom package creation form is initialising...');
        //Grab the data entered from the initial form (home page)
        this.custom = this.packageService.getInitialData();
        this.custom.checkin = new Date('February 4, 2016 10:13:00'); //TEMP While testing module
        this.custom.checkout = new Date('February 6, 2016 10:13:00'); //as above
        //From this data, calculate the duration the user is staying in Newcastle
        this.calculateDuration(this.custom.checkin, this.custom.checkout);
        //Populate the days array with this value
        this.setDaysArray(this.duration);
    };
    //Calculates the duration of the selected holiday
    CustomPackageComponent.prototype.calculateDuration = function (checkin, checkout) {
        /*  checks if the date has been entered or not. By Default it will be null, this will prevent
            acccess to the form via a refresh
        */
        if (checkin == null) {
            this.router.navigate(["/home"]); //navigates back to the home page
        }
        var one_day = 1000 * 60 * 60 * 24; //used to convert the time calculated into days
        console.log('[INFO] Checkin date: ', new Date(checkout)); //TODO: REMOVE
        console.log('[INFO] Checkout date: ', new Date(checkin)); //TODO: REMOVE
        //duration is a temp variable which calculates the duration of the trip
        var duration = new Date(checkout).getTime() - new Date(checkin).getTime();
        this.duration = Math.round(duration / one_day); //round to the nearest day
    };
    /* Assigns each day to the days array
        This is required since angular cannot pass in a value in the *ngFor
          e.g cannot do *ngFor="let x = 1; x <= duration ..."
          ngFor can only loop through arrays.
    */
    CustomPackageComponent.prototype.setDaysArray = function (duration) {
        console.log('[INFO] Duration: ', duration);
        for (var i = 1; i <= duration; i++) {
            this.days.push(i);
        }
        console.log('[INFO] Days Array: ', this.days);
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
    //Navigation
    CustomPackageComponent.prototype.prevForm = function () {
        if (this.selected != 1) {
            this.setNavigation(this.selected - 1);
        }
    };
    CustomPackageComponent.prototype.nextForm = function () {
        if (this.selected != 5) {
            this.setNavigation(this.selected + 1);
        }
    };
    CustomPackageComponent.prototype.setNavigation = function (selection) {
        /*
            When the user has selected the tab, it will then load the data.
            This will prevent long waiting time initially while the page is loading
            since the actual data has not been loaded yet.
        */
        this.selected = selection;
        console.log('[INFO] SELECTED VALUE: ', selection);
        switch (selection) {
            case 1: break;
            case 2:
                if (this.isLoaded[0].value == false) {
                    console.log('Loading accommodation');
                    this.getHotels(); //retrieve accommodation from the database.
                    this.isLoaded[0].value = true; //change loaded status to true.
                }
                break;
            case 3:
                if (this.isLoaded[1].value == false) {
                    console.log('Loading restaurants');
                    this.getFood(); //retrieve restaurants from the database.
                    this.isLoaded[1].value = true; //change loaded status to true.
                }
                break;
            case 4:
                if (this.isLoaded[2].value == false) {
                    console.log('Loading activities');
                    this.getActivities(); //retrieve activities from the database.
                    this.isLoaded[2].value = true; //change loaded status to true.
                }
                break;
            case 5: break;
        }
    };
    CustomPackageComponent.prototype.setDays = function (selection) {
        this.selectedDay = selection;
    };
    CustomPackageComponent.prototype.expand = function (value) {
        if (this.foodForm[value - 1].condition == 'none') {
            this.foodForm[value - 1].condition = 'block';
        }
        else {
            this.foodForm[value - 1].condition = 'none';
        }
    };
    // setTravelValue(selection : boolean) {
    //     this.travelValue = selection;
    // }
    /* Item Selection */
    CustomPackageComponent.prototype.addAccommodation = function (accID, accName) {
        alert('You have selected: \n Item ID: ' + accID + '\n Name: ' + accName);
        this.custom.hotel = accName;
        this.selectedAccommodation = accID;
        console.info('[INFO] Added ', this.custom.hotel, ' to cart.');
    };
    CustomPackageComponent.prototype.setFood = function (menuType, item, id, setForAll) {
        console.log('Setting food with the following parameters: ');
        console.log(' - Time of Day: ', menuType);
        console.log(' - Day: ', this.selectedDay);
        console.log(' - Item: ', item);
        console.log(' - Set all: ', setForAll);
        switch (menuType) {
            case 1:
                if (!setForAll) {
                    this.custom.foodBreakfast[this.selectedDay - 1] = new Object({ day: this.selectedDay, venueName: item, venueID: id, time: '0800' });
                }
                else {
                    for (var i = 0; i < this.duration; i++) {
                        this.custom.foodBreakfast[i] = new Object({ day: i, venueName: item, venueID: id, time: '0800' });
                    }
                }
                console.log(this.custom.foodBreakfast);
                this.foodForm[0].condition = 'none'; //hide breakfast form
                this.foodForm[1].condition = 'block'; //show lunch form
                break;
            case 2:
                if (!setForAll) {
                    this.custom.foodLunch[this.selectedDay - 1] = new Object({ day: this.selectedDay, venueName: item, venueID: id, time: '0800' });
                }
                else {
                    for (var i = 0; i < this.duration; i++) {
                        this.custom.foodLunch[i] = new Object({ day: i, venueName: item, venueID: id, time: '0800' });
                    }
                }
                console.log(this.custom.foodLunch);
                this.foodForm[1].condition = 'none'; //hide lunch form
                this.foodForm[2].condition = 'block'; //show dinner form
                break;
            case 3:
                if (!setForAll) {
                    this.custom.foodDinner[this.selectedDay - 1] = new Object({ day: this.selectedDay, venueName: item, venueID: id, time: '0800' });
                }
                else {
                    for (var i = 0; i < this.duration; i++) {
                        this.custom.foodDinner[i] = new Object({ day: i, venueName: item, venueID: id, time: '0800' });
                    }
                }
                console.log(this.custom.foodDinner);
                this.foodForm[2].condition = 'none'; //hide dinner form
                this.foodForm[3].condition = 'block'; //show other form
                break;
            case 4:
                if (!setForAll) {
                    this.custom.foodOther[this.selectedDay - 1] = new Object({ day: this.selectedDay, venueName: item, venueID: id, time: '0800' });
                }
                else {
                    for (var i = 0; i < this.duration; i++) {
                        this.custom.foodOther[i] = new Object({ day: i, venueName: item, venueID: id, time: '0800' });
                    }
                }
                console.log(this.custom.foodOther);
                this.foodForm[3].condition = 'none'; //hide other form
                break;
        }
    };
    /**
     * LOADING DATA
     */
    /* Retrieves all the hotel objects from the backend */
    CustomPackageComponent.prototype.getHotels = function () {
        var _this = this;
        console.log('[INFO] Retrieving the accommodation list');
        this.startLoading();
        //this.hotelService.getMockHotels().then((hotels: Hotel[]) => this.hotels = hotels);
        this.hotelService.getHotels()
            .subscribe(function (hotel) { return _this.accommodationList = hotel; });
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
        //Initialise the food arrays
        this.custom.foodBreakfast = [];
        this.custom.foodLunch = [];
        this.custom.foodDinner = [];
        this.custom.foodOther = [];
        for (var i = 1; i <= this.duration; i++) {
            this.custom.foodBreakfast.push(new Object()); //Creates an empty object in the breakfast array
            this.custom.foodLunch.push(new Object()); //Creates an empty object in the lunch array
            this.custom.foodDinner.push(new Object()); //Creates an empty object in the dinner array
            this.custom.foodOther.push(new Object()); //Creates an empty object in the other array
        }
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