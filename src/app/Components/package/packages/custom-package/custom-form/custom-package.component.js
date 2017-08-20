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
var activity_component_1 = require("../../../../../Components/activities/activity.component");
var food_and_drinks_component_1 = require("../../../../../Components/food-and-drinks/food-and-drinks.component");
//Services
var accommodation_service_1 = require("../../../../../Services/Accommodation/accommodation.service");
var food_and_drinks_service_1 = require("../../../../../Services/FoodAndDrinks/food-and-drinks.service");
var activity_service_1 = require("../../../../../Services/activity/activity.service");
var individual_accommodation_service_1 = require("../../../../../Services/Accommodation/individual-accommodation.service");
var individual_food_and_drinks_service_1 = require("../../../../../Services/FoodAndDrinks/individual-food-and-drinks.service");
var individual_activity_service_1 = require("../../../../../Services/Activity/individual-activity.service");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var custom_package_service_1 = require("../custom-package-service/custom-package.service");
//Custom Package Component
var CustomPackageComponent = (function () {
    //declare services
    function CustomPackageComponent(accommodationService, foodAndDrinksService, activityService, packageService, individualAccommodationService, individualFoodAndDrinksService, individualActivityService, slimLoadingBarService, router, dialog) {
        this.accommodationService = accommodationService;
        this.foodAndDrinksService = foodAndDrinksService;
        this.activityService = activityService;
        this.packageService = packageService;
        this.individualAccommodationService = individualAccommodationService;
        this.individualFoodAndDrinksService = individualFoodAndDrinksService;
        this.individualActivityService = individualActivityService;
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
    CustomPackageComponent.prototype.viewItem = function (item, accommodation, foodAndDrinks, activity) {
        //item 1: Accommodation, 2: Food and Drinks, 3: Activities
        switch (item) {
            case 1:
                this.individualAccommodationService.setAccommodation(accommodation);
                var dialogRef = this.dialog.open(accomodation_component_1.AccomodationComponent);
                dialogRef.afterClosed().subscribe(function (result) { });
                break;
            case 2:
                this.individualFoodAndDrinksService.setFoodAndDrinks(foodAndDrinks);
                var dialogRef2 = this.dialog.open(food_and_drinks_component_1.FoodAndDrinksComponent);
                dialogRef2.afterClosed().subscribe(function (result) { });
                break;
            case 3:
                this.individualActivityService.setActivity(activity);
                var dialogRef3 = this.dialog.open(activity_component_1.ActivityComponent);
                dialogRef3.afterClosed().subscribe(function (result) { });
                break;
        }
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
    CustomPackageComponent.prototype.setFood = function (foodAndDrinks, setForAll) {
        var _this = this;
        //this.foodForm
        var selectedTime;
        var dialogRef = this.dialog.open(AddFoodAndDrinksComponent, {
            data: foodAndDrinks
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("selected time is: ");
            console.log(result);
            if (result != null) {
                //If user has selected a value then continue adding item to the package
                if (setForAll) {
                    //if the user has selected to add to all days
                    for (var i = 0; i < _this.days.length; i++) {
                        //create a temp object and deep copy the foodAndDrinks object to it
                        var temp = Object.assign({}, foodAndDrinks);
                        //set the day and time selected to the temp object
                        temp.selectedDay = _this.days[i];
                        temp.selectedTime = result;
                        //push to the foodAndDrinks array
                        _this.custom.foodAndDrinks.push(temp);
                        _this.custom.selectedFoodAndDrinks.push(temp.foodAndDrinksID + _this.days[i]);
                    }
                }
                else {
                    //user has selected to add to day selected
                    foodAndDrinks.selectedDay = _this.selectedDay;
                    foodAndDrinks.selectedTime = result;
                    _this.custom.foodAndDrinks.push(foodAndDrinks);
                    _this.custom.selectedFoodAndDrinks.push(foodAndDrinks.foodAndDrinksID + _this.selectedDay);
                }
                console.info('[INFO] Added ', _this.custom.foodAndDrinks, ' to cart.');
            }
        });
    };
    CustomPackageComponent.prototype.removeFood = function (foodAndDrinks, setForAll) {
        if (setForAll) {
            var temp = this.custom.foodAndDrinks.filter(function (el) {
                return el.foodAndDrinksID !== foodAndDrinks.foodAndDrinksID;
            });
            this.custom.foodAndDrinks = temp;
            for (var i = 0; i < this.custom.selectedFoodAndDrinks.length; i++) {
                for (var j = 1; j <= this.days.length; j++) {
                    if (this.custom.selectedFoodAndDrinks[i] == foodAndDrinks.foodAndDrinksID + j) {
                        this.custom.selectedFoodAndDrinks.splice(j, 1);
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.custom.foodAndDrinks.length; i++) {
                if (this.custom.foodAndDrinks[i].foodAndDrinksID == foodAndDrinks.foodAndDrinksID
                    && this.custom.foodAndDrinks[i].selectedDay == this.selectedDay) {
                    this.custom.foodAndDrinks.splice(i, 1);
                }
            }
            for (var j = 0; j < this.custom.selectedFoodAndDrinks.length; j++) {
                if (this.custom.selectedFoodAndDrinks[j] == foodAndDrinks.foodAndDrinksID + this.selectedDay) {
                    this.custom.selectedFoodAndDrinks.splice(j, 1);
                }
            }
        }
        console.log(this.custom.foodAndDrinks);
    };
    /*  The checkFood function goes through the selecedFoodAndDrinks array
        and compares the item id and the selected item id
        
        If they are equal, then item has been added to the package, hence show 'Remove Item'
        If they are not equal, then item has not been added to the package, hence show 'Add Item'
    */
    CustomPackageComponent.prototype.checkFood = function (item) {
        for (var i = 0; i < this.custom.selectedFoodAndDrinks.length; i++)
            if (item.foodAndDrinksID + this.selectedDay == this.custom.selectedFoodAndDrinks[i])
                return false;
        return true;
    };
    CustomPackageComponent.prototype.setActivity = function (activity) {
        var _this = this;
        //this.foodForm
        var selectedTime;
        var dialogRef = this.dialog.open(AddActivityComponent, {
            data: activity
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("selected time is: ");
            console.log(result);
            if (result != null) {
                activity.selectedDay = _this.selectedDay;
                activity.selectedTime = result;
                _this.custom.activity.push(activity);
                _this.custom.selectedActivities.push(activity.activityID + _this.selectedDay);
                _this.custom.packageCost = _this.custom.packageCost + activity.price;
                console.info('[INFO] Added ', _this.custom.activity, ' to cart.');
            }
        });
    };
    CustomPackageComponent.prototype.removeActivity = function (activity) {
        for (var i = 0; i < this.custom.activity.length; i++) {
            if (this.custom.activity[i].activityID == activity.activityID
                && this.custom.activity[i].selectedDay == this.selectedDay) {
                this.custom.activity.splice(i, 1);
            }
        }
        for (var j = 0; j < this.custom.selectedActivities.length; j++) {
            if (this.custom.selectedActivities[j] == activity.activityID + this.selectedDay) {
                this.custom.selectedActivities.splice(j, 1);
            }
        }
        this.custom.packageCost = this.custom.packageCost - activity.price;
        console.log(this.custom.activity);
    };
    CustomPackageComponent.prototype.checkActivity = function (item) {
        for (var i = 0; i < this.custom.selectedActivities.length; i++)
            if (item.activityID + this.selectedDay == this.custom.selectedActivities[i])
                return false;
        return true;
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
        this.startLoading();
        this.foodAndDrinksService.getMockFood().then(function (fad) { return _this.foodAndDrinks = fad; })
            .then(function () { return _this.completeLoading(); });
        this.custom.foodAndDrinks = [];
        this.custom.selectedFoodAndDrinks = [];
    };
    /* Retrieves all activity objects from the backend */
    CustomPackageComponent.prototype.getActivities = function () {
        var _this = this;
        console.log('retrieving Activities');
        //this.activityService.getMockActivities().then((activity: Activity[]) => this.activities = activity);
        //this.startLoading();
        this.activityService.getActivities().subscribe(function (activity) { return _this.activities = activity; });
        this.custom.activity = [];
        this.custom.selectedActivities = [];
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
        food_and_drinks_service_1.FoodAndDrinksService,
        activity_service_1.ActivityService,
        custom_package_service_1.CustomPackageService,
        individual_accommodation_service_1.IndividualAccommodationService,
        individual_food_and_drinks_service_1.IndividualFoodAndDrinksService,
        individual_activity_service_1.IndividualActivityService,
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
var AddFoodAndDrinksComponent = (function () {
    function AddFoodAndDrinksComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.foodAndDrinks = data;
        console.log("imported value to dialog is: ");
        console.log(this.foodAndDrinks);
    }
    AddFoodAndDrinksComponent.prototype.checkMenuType = function () {
        for (var i = 0; i < this.foodAndDrinks.menuType.length; i++) {
            if (this.foodAndDrinks.menuType[i] == 'Bar') {
                return true;
            }
        }
        return false;
    };
    return AddFoodAndDrinksComponent;
}());
AddFoodAndDrinksComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'AddFoodAndDrinksComponent',
        templateUrl: 'AddFoodAndDrinksComponent.html'
    }),
    __param(1, core_1.Inject(material_1.MD_DIALOG_DATA)),
    __metadata("design:paramtypes", [material_1.MdDialogRef, Object])
], AddFoodAndDrinksComponent);
exports.AddFoodAndDrinksComponent = AddFoodAndDrinksComponent;
var AddActivityComponent = (function () {
    function AddActivityComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.time = new Date();
        this.activity = data;
        console.log("imported value to dialog is: ");
        console.log(this.activity);
    }
    AddActivityComponent.prototype.returnObj = function () {
        return '' + this.time.getHours() + this.time.getMinutes();
    };
    return AddActivityComponent;
}());
AddActivityComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'AddActivityComponent',
        templateUrl: 'AddActivityComponent.html'
    }),
    __param(1, core_1.Inject(material_1.MD_DIALOG_DATA)),
    __metadata("design:paramtypes", [material_1.MdDialogRef, Object])
], AddActivityComponent);
exports.AddActivityComponent = AddActivityComponent;
//# sourceMappingURL=custom-package.component.js.map