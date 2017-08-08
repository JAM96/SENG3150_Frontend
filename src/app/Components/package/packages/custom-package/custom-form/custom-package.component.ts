import {Component, Input, OnInit} from '@angular/core';

//import objects
import {Hotel} from '../../../../../Objects/Hotel/Hotel';
import {Food} from '../../../../../Objects/Food/Food';
import {Activity} from '../../../../../Objects/Activity/Activity';
import {CustomPackage} from '../CustomPackage';

//import services
import {HotelService} from '../../../../../Services/hotel/hotel.service';
import {FoodService} from '../../../../../Services/food/food.service';
import {ActivityService} from '../../../../../Services/activity/activity.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {CustomPackageService} from '../custom-package-service/custom-package.service';
import {Router} from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'custom-package',
    templateUrl: 'custom-package.component.html',
    providers: [
        HotelService,
        FoodService,
        ActivityService
        ]
})
export class CustomPackageComponent implements OnInit{
    custom : CustomPackage; //CustomPackage object for storing all the package items

    //Package Items
    accommodationList : Hotel[];//list of accomodation options in Newcastle
    food   : Food[];            //list of restaurants and bars in Newcastle
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
    isTrue = false;             //Depending on the screen size, if the user is on a computer, it will be opened
    screenWidth : number = document.getElementsByTagName('body')[0].clientWidth;    //calculate the users screen width

    //Travel Form
    travelValue : string = 'No';    //Option selected by the user
    travelOptions = ['Yes','No'];   //List of available travel options

    //Accommodation Form
    selectedAccommodation : String;

    //Food and Drinks Form
    foodForm = [
        {display: 'displayB', condition: 'none', value: 1, eatingTime: 'Breakfast'},
        {display: 'displayL', condition: 'none', value: 2, eatingTime: 'Lunch'},
        {display: 'displayD', condition: 'none', value: 3, eatingTime: 'Dinner'},
        {display: 'displayO', condition: 'none', value: 4, eatingTime: 'Other'}
    ]   // this object will be in charge of iterating through the four times for food.

    constructor(
        private hotelService    :   HotelService,
        private foodService     :   FoodService,
        private activityService :   ActivityService,
        private packageService  :   CustomPackageService,
        private slimLoadingBarService : SlimLoadingBarService,
        private router          : Router
        ) {}

    ngOnInit() {
        console.log('[INFO] Custom package creation form is initialising...')
        //Grab the data entered from the initial form (home page)
        this.custom = this.packageService.getInitialData();
        this.custom.checkin = new Date('February 4, 2016 10:13:00'); //TEMP While testing module
        this.custom.checkout = new Date('February 6, 2016 10:13:00'); //as above

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
                    console.log('Loading accommodation');
                    this.getHotels(); //retrieve accommodation from the database.
                    this.isLoaded[0].value = true; //change loaded status to true.
                }
                break;
            case 3: 
                if(this.isLoaded[1].value == false) {
                    console.log('Loading restaurants');
                    this.getFood(); //retrieve restaurants from the database.
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

    // setTravelValue(selection : boolean) {
    //     this.travelValue = selection;
    // }


    /* Item Selection */
    addAccommodation(accID : string, accName : string) {
        alert('You have selected: \n Item ID: ' + accID + '\n Name: ' + accName);
        this.custom.hotel = accName;
        this.selectedAccommodation = accID;

        console.info('[INFO] Added ', this.custom.hotel, ' to cart.');
    }


    setFood(menuType : number, item : string, id : string, setForAll : boolean) {
        console.log('Setting food with the following parameters: ');
                console.log(' - Time of Day: ', menuType);
                console.log(' - Day: ', this.selectedDay);
                console.log(' - Item: ', item);
                console.log(' - Set all: ', setForAll);

        switch(menuType) {
            case 1: //Breakfast
                if(!setForAll) {
                    this.custom.foodBreakfast[this.selectedDay-1] = new Object(
                        {day: this.selectedDay, venueName: item, venueID: id, time: '0800'});
                } else {
                    for(let i = 0; i < this.duration; i++) {
                        this.custom.foodBreakfast[i] = new Object({day: i, venueName: item, venueID: id, time: '0800'});
                    }
                }
                console.log(this.custom.foodBreakfast);

                this.foodForm[0].condition = 'none';    //hide breakfast form
                this.foodForm[1].condition = 'block';   //show lunch form
                break;
            case 2: //Lunch
                if(!setForAll) {
                    this.custom.foodLunch[this.selectedDay-1] = new Object(
                        {day: this.selectedDay, venueName: item, venueID: id, time: '0800'});
                } else {
                    for(let i = 0; i < this.duration; i++) {
                        this.custom.foodLunch[i] = new Object({day: i, venueName: item, venueID: id, time: '0800'});
                    }
                }
                console.log(this.custom.foodLunch);
                this.foodForm[1].condition = 'none';    //hide lunch form
                this.foodForm[2].condition = 'block';   //show dinner form
                break;
            case 3: //Dinner
                if(!setForAll) {
                    this.custom.foodDinner[this.selectedDay-1] = new Object(
                        {day: this.selectedDay, venueName: item, venueID: id, time: '0800'});
                } else {
                    for(let i = 0; i < this.duration; i++) {
                        this.custom.foodDinner[i] = new Object({day: i, venueName: item, venueID: id, time: '0800'});
                    }
                }
                console.log(this.custom.foodDinner);
                this.foodForm[2].condition = 'none';    //hide dinner form
                this.foodForm[3].condition = 'block';   //show other form
                break;
            case 4: //Other
                if(!setForAll) {
                    this.custom.foodOther[this.selectedDay-1] = new Object(
                        {day: this.selectedDay, venueName: item, venueID: id, time: '0800'});
                } else {
                    for(let i = 0; i < this.duration; i++) {
                        this.custom.foodOther[i] = new Object({day: i, venueName: item, venueID: id, time: '0800'});
                    }
                }
                console.log(this.custom.foodOther);
                this.foodForm[3].condition = 'none';    //hide other form
                break;
        }
    }

    /**
     * LOADING DATA
     */

    /* Retrieves all the hotel objects from the backend */
    getHotels() {
        console.log('[INFO] Retrieving the accommodation list');

        this.startLoading();

        this.hotelService.getMockHotels().then((hotels: Hotel[]) => this.accommodationList = hotels);
        //  this.hotelService.getHotels()
        //      .subscribe((hotel : Hotel[]) => this.accommodationList = hotel)

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
        setTimeout(() => {
            this.completeLoading();
        }, 1000);
    }

    /* Retrieves all food objects from the backend */
    getFood() {
        console.log('retrieving food');
        this.foodService.getMockFood().then((food: Food[]) => this.food = food);
        this.startLoading();
       
        // this.foodService.getFood()
        //     .subscribe((food : Food[]) => this.food = food);
        
        //fake loading bar
        setTimeout(() => {
            this.completeLoading();
        }, 1000);

        //Initialise the food arrays
        this.custom.foodBreakfast = [];
        this.custom.foodLunch = [];
        this.custom.foodDinner = [];
        this.custom.foodOther = [];

        for(let i = 1; i <= this.duration; i++) {
            this.custom.foodBreakfast.push(new Object());   //Creates an empty object in the breakfast array
            this.custom.foodLunch.push(new Object());       //Creates an empty object in the lunch array
            this.custom.foodDinner.push(new Object());      //Creates an empty object in the dinner array
            this.custom.foodOther.push(new Object());       //Creates an empty object in the other array
        }
    }

    /* Retrieves all activity objects from the backend */
    getActivities() {
        console.log('retrieving Activities');
        this.activityService.getMockActivities().then((activity: Activity[]) => this.activities = activity);
        this.startLoading();
       
        // this.activityService.getActivities()
        //     .subscribe((activity : Activity[]) => this.activities = activity);
        
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
            return window.confirm("You will lose all changes and will have to start again. Are you sure you want to continue?");
        } else {
            return true;
        }
    }
}