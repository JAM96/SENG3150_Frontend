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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
//Core Imports
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var router_1 = require("@angular/router");
//External Components
var accomodation_component_1 = require("../../../../../Components/accomodation/accomodation.component");
//Services
var accommodation_service_1 = require("../../../../../Services/Accommodation/accommodation.service");
var individual_accommodation_service_1 = require("../../../../../Services/Accommodation/individual-accommodation.service");
var food_and_drinks_service_1 = require("../../../../../Services/FoodAndDrinks/food-and-drinks.service");
var activity_service_1 = require("../../../../../Services/activity/activity.service");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var custom_package_service_1 = require("../custom-package-service/custom-package.service");
//Custom Package Component
var CustomPackageComponent = (function () {
    function CustomPackageComponent(accommodationService, individualAccommodationService, foodAndDrinksService, activityService, packageService, slimLoadingBarService, router, dialog) {
        this.accommodationService = accommodationService;
        this.individualAccommodationService = individualAccommodationService;
        this.foodAndDrinksService = foodAndDrinksService;
        this.activityService = activityService;
        this.packageService = packageService;
        this.slimLoadingBarService = slimLoadingBarService;
        this.router = router;
        this.dialog = dialog;
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
        this.isTrue = true; //Depending on the screen size, if the user is on a computer, it will be opened
        this.screenWidth = document.getElementsByTagName('body')[0].clientWidth; //calculate the users screen width
        //Travel Form
        this.travelValue = 'No'; //Option selected by the user
        this.travelOptions = ['Yes', 'No']; //List of available travel options
        this.previousSelectedAccommodation = 0; //this will store the previously selected price to minus from the total.
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
        console.log(this.custom);
        this.custom.checkin = new Date('February 4, 2016 10:13:00'); //TEMP While testing module
        this.custom.checkout = new Date('February 6, 2016 10:13:00'); //as above
        if (this.custom.navigation == null) {
            console.log("Setting up custom package for the first time");
            this.selected = 1;
            this.selectedDay = 1;
            this.travelValue = 'No';
            this.budget = this.custom.budget;
            this.custom.packageCost = 0;
        }
        else {
            console.log("Package is already created");
            this.selected = this.custom.navigation;
            this.selectedDay = this.custom.aSelectedDay;
            this.travelValue = this.custom.requireTravel;
            this.selectedAccommodation = this.custom.accommodation.accommodationID;
            this.selectedAccommodationName = this.custom.accommodation.accommodationName;
            this.budget = this.custom.budget;
            this.previousSelectedAccommodation = this.custom.previousSelectedAccommodation;
            this.getAccommodation();
            this.getActivities();
            this.getFoodAndDrinks();
        }
        if (this.budget == null) {
            this.budget = 472;
        }
        if (this.custom.travel == null) {
            var temp = {
                pickup: true,
                address: null,
                city: null,
                state: null,
                postcode: null,
                date: null,
                time: null,
            };
            this.custom.travel = [];
            this.custom.travel[0] = Object.assign({}, temp);
            this.custom.travel[1] = Object.assign({}, temp);
            this.custom.travel[1].pickup = false;
        }
        this.travelPickup = this.custom.travel[0];
        this.travelDropoff = this.custom.travel[1];
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
    CustomPackageComponent.prototype.viewItem = function (item, name, id) {
        for (var i = 0; i < this.accommodationList.length; i++) {
            console.log(i);
            if (this.accommodationList[i].accommodationID == id) {
                console.log("FOUND");
                console.log(this.accommodationList[i]);
                this.individualAccommodationService.setAccommodation(this.accommodationList[i]);
                break;
            }
        }
        var dialogRef = this.dialog.open(accomodation_component_1.AccomodationComponent);
        dialogRef.afterClosed().subscribe(function (result) { });
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
                    console.log('[INFO] Loading Accommodation');
                    this.getAccommodation(); //retrieve accommodation from the database.
                    this.isLoaded[0].value = true; //change loaded status to true.
                }
                break;
            case 3:
                if (this.isLoaded[1].value == false) {
                    console.log('Loading restaurants');
                    this.getFoodAndDrinks(); //retrieve restaurants from the database.
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
    CustomPackageComponent.prototype.showObject = function () {
        console.log(this.custom);
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
    /* Item Selection */
    CustomPackageComponent.prototype.addAccommodation = function (accommodation) {
        var _this = this;
        var selectedRoom;
        var dialogRef = this.dialog.open(AddAccommodationComponent, {
            data: accommodation.room
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("selected room is: ");
            console.log(result);
            if (result != null) {
                for (var i = 0; i < accommodation.room.length; i++) {
                    if (accommodation.room[i].roomID = result)
                        selectedRoom = accommodation.room[i];
                }
                _this.custom.accommodation = accommodation;
                _this.custom.accommodation.selectedRoom = selectedRoom;
                _this.selectedAccommodation = accommodation.accommodationID;
                _this.selectedAccommodationName = accommodation.accommodationName;
                var price = selectedRoom.roomPrice;
                _this.custom.packageCost = _this.custom.packageCost - _this.previousSelectedAccommodation + price * _this.duration; //update the package cost
                _this.previousSelectedAccommodation = price * _this.duration; //Replace the previous accommodation cost to the selected one
                console.info('[INFO] Added ', _this.custom.accommodation, ' to cart.');
            }
        });
    };
    CustomPackageComponent.prototype.setFood = function (menuType, item, id, setForAll, time) {
        console.log('Setting food with the following parameters: ');
        console.log(' - Time of Day: ', menuType);
        console.log(' - Day: ', this.selectedDay);
        console.log(' - Item: ', item);
        console.log(' - Set all: ', setForAll);
        var dayShift = 0;
        switch (menuType) {
            case 'Breakfast':
                this.foodForm[0].condition = 'none'; //hide breakfast form
                this.foodForm[1].condition = 'block'; //show lunch form
                break;
            case 'Lunch':
                this.foodForm[1].condition = 'none'; //hide lunch form
                this.foodForm[2].condition = 'block'; //show dinner form
                dayShift = this.duration;
                break;
            case 'Dinner':
                this.foodForm[2].condition = 'none'; //hide dinner form
                this.foodForm[3].condition = 'block'; //show other form
                dayShift = this.duration * 2;
                break;
            case 'Other':
                this.foodForm[3].condition = 'none'; //hide other form;
                dayShift = this.duration * 3;
                break;
        }
        if (!setForAll) {
            var tempItem = {
                type: menuType,
                day: this.selectedDay,
                venueName: item,
                venueID: id,
                time: time
            };
            this.custom.foodAndDrinks[dayShift + this.selectedDay - 1] = tempItem;
        }
        else {
            for (var i = dayShift; i < dayShift + this.duration; i++) {
                var tempItemA = {
                    type: menuType,
                    day: i - dayShift + 1,
                    venueName: item,
                    venueID: id,
                    time: time
                };
                this.custom.foodAndDrinks[i] = tempItemA;
            }
        }
        console.log(this.custom.foodAndDrinks);
    };
    /**
     * LOADING DATA
     */
    CustomPackageComponent.prototype.assignTopFeatures = function () {
        console.log("Assigning top features");
        for (var i = 0; i < this.accommodationList.length; i++) {
            this.accommodationList[i].topFeatures = []; //initialise top feature array
            //assign the first 3 features to the correct accommodation
            for (var j = 0; j < 3; j++)
                if (this.accommodationList[i].features[0] != null)
                    this.accommodationList[i].topFeatures.push(this.accommodationList[i].features[j]);
        }
    };
    /* Retrieves all the accommodation objects from the backend */
    CustomPackageComponent.prototype.getAccommodation = function () {
        var _this = this;
        console.log('[INFO] Retrieving the accommodation list');
        //start loading 
        this.startLoading();
        //temp variables to hold accommodaiton information
        var features;
        var rooms;
        //Mock Database
        //this.accommodationService.getMockAccommodation().then((accommodation: Accommodation[]) => this.accommodationList = accommodation);
        //Load the data from the database
        this.accommodationService.getAccommodation()
            .then(function (accommodation) { return _this.accommodationList = accommodation; }) //get the main accommodation data
            .then(function () { return console.log("Accommodation Loaded"); }) //Output that accommodation has been loaded
            .then(function () { return console.log("Features and rooms assigned"); }) //Output
            .then(function () { return _this.assignTopFeatures(); }) //Set the top 3 features to each accommodation
            .then(function () { return _this.completeLoading(); }); //Complete the loading
    };
    /* Retrieves all food objects from the backend */
    CustomPackageComponent.prototype.getFoodAndDrinks = function () {
        var _this = this;
        console.log('retrieving food and drinks');
        //this.foodAndDrinksService.getMockFood().then((fad: FoodAndDrinks[]) => this.foodAndDrinks = fad);
        this.startLoading();
        this.foodAndDrinksService.getFoodAndDrinks()
            .then(function (fad) { return _this.foodAndDrinks = fad; })
            .then(function () { return _this.completeLoading(); });
        //Initialise the Food and Drinks array
        var temp;
        this.custom.foodAndDrinks = [];
        //duration of trip * 4 options
        for (var i = 0; i < this.days.length * 4; i++) {
            this.custom.foodAndDrinks[i] = Object.assign({}, temp);
        }
    };
    /* Retrieves all activity objects from the backend */
    CustomPackageComponent.prototype.getActivities = function () {
        var _this = this;
        console.log('retrieving Activities');
        //this.activityService.getMockActivities().then((activity: Activity[]) => this.activities = activity);
        this.startLoading();
        this.activityService.getActivities().subscribe(function (activity) { return _this.activities = activity; });
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
            this.saveForm();
            return true;
        }
        else {
            return true;
        }
    };
    CustomPackageComponent.prototype.saveForm = function () {
        this.custom.aSelectedDay = this.selectedDay;
        this.custom.fSelectedDay = this.selectedDay;
        this.custom.navigation = this.selected;
        this.custom.requireTravel = this.travelValue;
        this.custom.travel[0] = this.travelPickup;
        this.custom.travel[1] = this.travelDropoff;
        this.custom.budget = this.budget;
        this.custom.previousSelectedAccommodation = this.previousSelectedAccommodation;
        this.packageService.cp = this.custom;
        console.log("Form Saved");
    };
    CustomPackageComponent.prototype.fillDropOff = function () {
        this.travelDropoff = Object.assign({}, this.travelPickup);
    };
    CustomPackageComponent.prototype.changeBudget = function () {
        var _this = this;
        var dialogRef = this.dialog.open(BudgetChangeComponent, {
            data: this.budget,
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("result is : " + result);
            _this.budget = result;
        });
    };
    return CustomPackageComponent;
}());
CustomPackageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'custom-package',
        templateUrl: 'custom-package.component.html',
        providers: [
            accommodation_service_1.AccommodationService,
            food_and_drinks_service_1.FoodAndDrinksService,
            activity_service_1.ActivityService
        ]
    }),
    __metadata("design:paramtypes", [accommodation_service_1.AccommodationService,
        individual_accommodation_service_1.IndividualAccommodationService,
        food_and_drinks_service_1.FoodAndDrinksService,
        activity_service_1.ActivityService,
        custom_package_service_1.CustomPackageService,
        ng2_slim_loading_bar_1.SlimLoadingBarService,
        router_1.Router,
        material_1.MdDialog])
], CustomPackageComponent);
exports.CustomPackageComponent = CustomPackageComponent;
var BudgetChangeComponent = (function () {
    function BudgetChangeComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.value = data;
        console.log("imported value: " + this.value);
    }
    return BudgetChangeComponent;
}());
BudgetChangeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'budgetChangeComponent',
        templateUrl: 'BudgetChangeComponent.html'
    }),
    __param(1, core_1.Inject(material_1.MD_DIALOG_DATA)),
    __metadata("design:paramtypes", [material_1.MdDialogRef, Object])
], BudgetChangeComponent);
exports.BudgetChangeComponent = BudgetChangeComponent;
var AddAccommodationComponent = (function () {
    function AddAccommodationComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.rooms = data;
        console.log("imported value to dialog is: ");
        console.log(this.rooms);
    }
    return AddAccommodationComponent;
}());
AddAccommodationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'AddAccommodationComponent',
        templateUrl: 'AddAccommodationComponent.html'
    }),
    __param(1, core_1.Inject(material_1.MD_DIALOG_DATA)),
    __metadata("design:paramtypes", [material_1.MdDialogRef, Object])
], AddAccommodationComponent);
exports.AddAccommodationComponent = AddAccommodationComponent;
//# sourceMappingURL=custom-package.component.js.map