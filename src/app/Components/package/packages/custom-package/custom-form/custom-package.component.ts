//Core Imports
    import {Component, Input, OnInit, Inject} from '@angular/core';
    import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
    import {Router} from '@angular/router';
//External Components
    import {AccomodationComponent} from '../../../../../Components/accomodation/accomodation.component';
//Objects
    import {Accommodation} from '../../../../../Objects/Accommodation/Accommodation';
    import {Room} from '../../../../../Objects/Accommodation/Room';
    import {Feature} from '../../../../../Objects/Accommodation/Feature';
    import {FoodAndDrinks} from '../../../../../Objects/FoodAndDrinks/FoodAndDrinks';
    import {Activity} from '../../../../../Objects/Activity/Activity';
    import {CustomPackage} from '../CustomPackage';
    import {FoodAndDrinksForm} from './objects/FoodAndDrinksForm';
    import {TravelInformation} from './objects/TravelInformation';
//Services
    import {AccommodationService} from '../../../../../Services/Accommodation/accommodation.service';
    import {IndividualAccommodationService} from '../../../../../Services/Accommodation/individual-accommodation.service';
    import {FoodAndDrinksService} from '../../../../../Services/FoodAndDrinks/food-and-drinks.service';
    import {ActivityService} from '../../../../../Services/activity/activity.service';
    import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
    import {CustomPackageService} from '../custom-package-service/custom-package.service';

//Custom Package Component
@Component({
    moduleId: module.id,
    selector: 'custom-package',
    templateUrl: 'custom-package.component.html',
    providers: [
        AccommodationService,
        FoodAndDrinksService,
        ActivityService
        ]
})
export class CustomPackageComponent implements OnInit{
    custom : CustomPackage; //CustomPackage object for storing all the package items
    public budget : number;

    //Package Items
    accommodationList : Accommodation[];//list of accomodation options in Newcastle
    foodAndDrinks   : FoodAndDrinks[];            //list of restaurants and bars in Newcastle
    activities  : Activity[];   //list of events and activities in Newcastle

    isLoaded = [
        {type: 'accommodation', value: false},
        {type: 'restauarants',  value: false},
        {type: 'activities',    value: false},
    ]

    //View variables
    selected : number = 1;      //Tab selection, 1=Travel, 2=Accommodation, 3=Restauarants, 4=Activities, 5=Cart

    //Restaurants and Activities View
    days : number[] = [];       //Used to store the amount of days the user is staying
    selectedDay : number = 1;   //The day that has been selected for input of the package item
    duration : number;          //The amount of days the user is staying in Newcastle

    //Side menu
    isTrue = true;             //Depending on the screen size, if the user is on a computer, it will be opened
    screenWidth : number = document.getElementsByTagName('body')[0].clientWidth;    //calculate the users screen width

    //Travel Form
    travelValue : string = 'No';    //Option selected by the user
    travelOptions = ['Yes','No'];   //List of available travel options
    travelPickup : TravelInformation;   //holds the travel pickup information
    travelDropoff : TravelInformation;  //holds the travel dropoff information

    //Accommodation Form
    selectedAccommodation : string;             //the selected accommodation (id)
    selectedAccommodationName : string;         //the selected accommodation (name)
    previousSelectedAccommodation : number = 0;  //this will store the previously selected price to minus from the total.

    //Food and Drinks Form
    foodForm = [
        {display: 'displayB', condition: 'none', value: 1, eatingTime: 'Breakfast'},
        {display: 'displayL', condition: 'none', value: 2, eatingTime: 'Lunch'},
        {display: 'displayD', condition: 'none', value: 3, eatingTime: 'Dinner'},
        {display: 'displayO', condition: 'none', value: 4, eatingTime: 'Other'}
    ]   // this object will be in charge of iterating through the four times for food.

    constructor(
        private accommodationService            :   AccommodationService,
        private individualAccommodationService  :   IndividualAccommodationService,
        private foodAndDrinksService            :   FoodAndDrinksService,
        private activityService                 :   ActivityService,
        private packageService                  :   CustomPackageService,
        private slimLoadingBarService           :   SlimLoadingBarService,
        private router                          :   Router,
        public dialog                           :   MdDialog
        ) {}

    ngOnInit() {
        console.log('[INFO] Custom package creation form is initialising...')
        //Grab the data entered from the initial form (home page)
        this.custom = this.packageService.getInitialData();
        console.log(this.custom);

        this.custom.checkin = new Date('February 4, 2016 10:13:00'); //TEMP While testing module
        this.custom.checkout = new Date('February 6, 2016 10:13:00'); //as above

        if(this.custom.navigation == null) {
            console.log("Setting up custom package for the first time");
            this.selected = 1;
            this.selectedDay = 1;
            this.travelValue = 'No'
            this.budget = this.custom.budget;
            this.custom.packageCost = 0;
        } else {
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

        if(this.budget == null) {
            this.budget = 472;
        }

        if(this.custom.travel == null) {
            var temp : TravelInformation = {
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
    }

    //Calculates the duration of the selected holiday
    calculateDuration(checkin : Date, checkout : Date) {
        /*  checks if the date has been entered or not. By Default it will be null, this will prevent
            acccess to the form via a refresh
        */
        if(checkin == null) {
            this.router.navigate(["/home"]);    //navigates back to the home page
        }

        var one_day=1000*60*60*24;  //used to convert the time calculated into days

        console.log('[INFO] Checkin date: ', new Date(checkout));   //TODO: REMOVE
        console.log('[INFO] Checkout date: ', new Date(checkin));   //TODO: REMOVE

        //duration is a temp variable which calculates the duration of the trip
        var duration = new Date(checkout).getTime() - new Date(checkin).getTime();
        this.duration = Math.round(duration/one_day);   //round to the nearest day
    }


    /* Assigns each day to the days array
        This is required since angular cannot pass in a value in the *ngFor
          e.g cannot do *ngFor="let x = 1; x <= duration ..."
          ngFor can only loop through arrays.
    */
    setDaysArray(duration : number) {
        console.log('[INFO] Duration: ', duration);

        for(let i = 1; i <= duration; i++) {
            this.days.push(i);
        }
        console.log('[INFO] Days Array: ', this.days);
    }

    viewItem(item : number, name : string, id : string){
        for(var i = 0; i < this.accommodationList.length; i++) {
            console.log(i);
            if(this.accommodationList[i].accommodationID == id) {
                console.log("FOUND");
                console.log(this.accommodationList[i]);
                this.individualAccommodationService.setAccommodation(this.accommodationList[i]);
                break;
            }
        }

        let dialogRef = this.dialog.open(AccomodationComponent);
        dialogRef.afterClosed().subscribe(result => {})
    }

    //fake loading atm
    startLoading() {
        this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
    }
    stopLoading() {
        this.slimLoadingBarService.stop();
    }
    completeLoading() {
        this.slimLoadingBarService.complete();
    }

    //Navigation
    prevForm() {
        if(this.selected != 1) {
            this.setNavigation(this.selected - 1);
        }
    }
    nextForm() {
        if(this.selected != 5) {    //prevent from exceeding the limit
            this.setNavigation(this.selected + 1);
        }
    }
    setNavigation(selection : number) {
        /*
            When the user has selected the tab, it will then load the data.
            This will prevent long waiting time initially while the page is loading
            since the actual data has not been loaded yet.
        */
        this.selected = selection;
        console.log('[INFO] SELECTED VALUE: ', selection);

        switch(selection) {
            case 1: break;
            case 2:         
                if(this.isLoaded[0].value == false) {
                    console.log('[INFO] Loading Accommodation');
                    this.getAccommodation(); //retrieve accommodation from the database.
                    this.isLoaded[0].value = true; //change loaded status to true.
                }
                break;
            case 3: 
                if(this.isLoaded[1].value == false) {
                    console.log('Loading restaurants');
                    this.getFoodAndDrinks(); //retrieve restaurants from the database.
                    this.isLoaded[1].value = true; //change loaded status to true.
                }
                break;
            case 4: 
                if(this.isLoaded[2].value == false) {
                    console.log('Loading activities');
                    this.getActivities(); //retrieve activities from the database.
                    this.isLoaded[2].value = true; //change loaded status to true.
                }
                break;
            case 5: break;
        }
    }

    showObject() {
        console.log(this.custom)
    }

    setDays(selection : number) {
        this.selectedDay = selection;
    }

    expand(value : number) {
        if(this.foodForm[value-1].condition == 'none') {
            this.foodForm[value-1].condition = 'block';
        } else {
            this.foodForm[value-1].condition = 'none';
        }
    }

    /* Item Selection */
    addAccommodation(accommodation : Accommodation) {
        var selectedRoom : Room;

        let dialogRef = this.dialog.open(AddAccommodationComponent, {
            data: accommodation.room
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("selected room is: ");
            console.log(result);

            for(var i = 0; i < accommodation.room.length; i++){
                if(accommodation.room[i].roomID = result)
                    selectedRoom = accommodation.room[i]
            }
            
            this.custom.accommodation = accommodation;
            this.custom.accommodation.selectedRoom = selectedRoom;
            this.selectedAccommodation = accommodation.accommodationID;
            this.selectedAccommodationName = accommodation.accommodationName;

            var price = selectedRoom.roomPrice;

            this.custom.packageCost = this.custom.packageCost - this.previousSelectedAccommodation + price * this.duration;  //update the package cost
            this.previousSelectedAccommodation = price * this.duration; //Replace the previous accommodation cost to the selected one
            console.info('[INFO] Added ', this.custom.accommodation, ' to cart.');
        });
    }

    setFood(menuType : string, item : string, id : string, setForAll : boolean, time : string) {
        console.log('Setting food with the following parameters: ');
                console.log(' - Time of Day: ', menuType);
                console.log(' - Day: ', this.selectedDay);
                console.log(' - Item: ', item);
                console.log(' - Set all: ', setForAll);
        var dayShift = 0; 

        switch(menuType) {
            case 'Breakfast':
                this.foodForm[0].condition = 'none';    //hide breakfast form
                this.foodForm[1].condition = 'block';   //show lunch form
                break;
            case 'Lunch':
                this.foodForm[1].condition = 'none';    //hide lunch form
                this.foodForm[2].condition = 'block';   //show dinner form
                dayShift = this.duration;
                break;
            case 'Dinner':
                this.foodForm[2].condition = 'none';    //hide dinner form
                this.foodForm[3].condition = 'block';   //show other form
                dayShift = this.duration*2;
                break;
            case 'Other':
                this.foodForm[3].condition = 'none';    //hide other form;
                dayShift = this.duration*3;
                break;
        }

        if(!setForAll){
            var tempItem : FoodAndDrinksForm = {
                type        : menuType,
                day         : this.selectedDay,
                venueName   : item,
                venueID     : id, 
                time        : time
            }
            this.custom.foodAndDrinks[dayShift + this.selectedDay-1] = tempItem;
        } else {
            for (let i = dayShift; i < dayShift+this.duration; i++) {
                 var tempItemA : FoodAndDrinksForm = {
                    type        : menuType,
                    day         : i-dayShift + 1,
                    venueName   : item,
                    venueID     : id, 
                    time        : time
                }

                this.custom.foodAndDrinks[i] = tempItemA;
            }
        }

        console.log(this.custom.foodAndDrinks);
    }
    
    /**
     * LOADING DATA
     */

    assignTopFeatures() {
        console.log("Assigning top features");
        for(var i = 0; i < this.accommodationList.length; i++){
            this.accommodationList[i].topFeatures = []; //initialise top feature array

            //assign the first 3 features to the correct accommodation
            for(var j = 0; j < 3; j++)
                if(this.accommodationList[i].features[0] != null) 
                    this.accommodationList[i].topFeatures.push(this.accommodationList[i].features[j]);
        }
    }
    
    /* Retrieves all the accommodation objects from the backend */
    getAccommodation() {
        console.log('[INFO] Retrieving the accommodation list');

        //start loading 
        this.startLoading();

        //temp variables to hold accommodaiton information
        var features : Feature[];
        var rooms : Room[];

        //Mock Database
        //this.accommodationService.getMockAccommodation().then((accommodation: Accommodation[]) => this.accommodationList = accommodation);

        //Load the data from the database
        this.accommodationService.getAccommodation()
            .then((accommodation: Accommodation[]) => this.accommodationList = accommodation)   //get the main accommodation data
            .then(() => console.log("Accommodation Loaded"))                                    //Output that accommodation has been loaded
            .then(() => console.log("Features and rooms assigned"))                             //Output
            .then(() => this.assignTopFeatures())                                               //Set the top 3 features to each accommodation
            .then(() => this.completeLoading());                                                //Complete the loading
    }

    /* Retrieves all food objects from the backend */
    getFoodAndDrinks() {
        console.log('retrieving food and drinks');
        //this.foodAndDrinksService.getMockFood().then((fad: FoodAndDrinks[]) => this.foodAndDrinks = fad);
        this.startLoading();
       
        this.foodAndDrinksService.getFoodAndDrinks().subscribe((fad : FoodAndDrinks[]) => this.foodAndDrinks = fad);
        
        //fake loading bar
        setTimeout(() => {
            this.completeLoading();
        }, 1000);

       
        var temp : FoodAndDrinksForm;

        this.custom.foodAndDrinks = [];

        //duration of trip * 4 options
        for(var i = 0; i < this.days.length*4; i++) {
            this.custom.foodAndDrinks[i] = Object.assign({}, temp);
        }
    }

    /* Retrieves all activity objects from the backend */
    getActivities() {
        console.log('retrieving Activities');
        //this.activityService.getMockActivities().then((activity: Activity[]) => this.activities = activity);
        this.startLoading();
       
        this.activityService.getActivities().subscribe((activity : Activity[]) => this.activities = activity);
        
        //fake loading bar
        setTimeout(() => {
            this.completeLoading();
        }, 1000);
    }

    canDeactivate(){ 
        console.log('i am navigating away');
        console.log(this.custom.checkin);
        //check if user wants to navigate away
        if(this.custom.checkin != null) {
            this.saveForm();
            return true;
        } else {
            return true;
        }
    }

    saveForm() {
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
    }

    fillDropOff() {
        this.travelDropoff = Object.assign({}, this.travelPickup);
    }

    changeBudget() {
        let dialogRef = this.dialog.open(BudgetChangeComponent, {
            data: this.budget,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("result is : " + result);
            this.budget = result;
        });
    }
}

@Component({
    moduleId: module.id,
    selector: 'budgetChangeComponent',
    templateUrl: 'BudgetChangeComponent.html'
})
export class BudgetChangeComponent{
    value : number;

    constructor (public dialogRef: MdDialogRef<BudgetChangeComponent>,
                @Inject(MD_DIALOG_DATA) public data: any) {
                    this.value = data;
                    console.log("imported value: " + this.value)
                }
}

@Component({
    moduleId: module.id,
    selector: 'AddAccommodationComponent',
    templateUrl: 'AddAccommodationComponent.html'
})
export class AddAccommodationComponent{
    rooms : Room[];

    constructor (public dialogRef: MdDialogRef<AddAccommodationComponent>,
                @Inject(MD_DIALOG_DATA) public data: any) {
                    this.rooms = data;
                    console.log("imported value to dialog is: ");
                    console.log(this.rooms);
                }
}