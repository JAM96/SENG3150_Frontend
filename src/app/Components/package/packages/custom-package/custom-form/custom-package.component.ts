import {Component, Input, OnInit} from '@angular/core';

//import objects
import {Hotel} from '../../../../../Objects/Hotel/Hotel';
import {Food} from '../../../../../Objects/Food/Food';
import {Activity} from '../../../../../Objects/Activity/Activity';

//import services
import {HotelService} from '../../../../../Services/hotel/hotel.service';
import {FoodService} from '../../../../../Services/food/food.service';
import {ActivityService} from '../../../../../Services/activity/activity.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {CustomPackageService} from '../custom-package-service/custom-package.service';
import {Router} from '@angular/router';


import {CustomPackage} from '../CustomPackage';

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
    custom : CustomPackage;

    //Package Items
    hotels : Hotel[];
    food   : Food[];
    activities  : Activity[];

    //View variables
    selected : number = 1;
    days : number[] = [];
    selectedDay : number = this.days[0];
    duration : number;

    isTrue = false;
    screenWidth : number = document.getElementsByTagName('body')[0].clientWidth;
    loaded = false;

    //travel form
    travelSubmitted : boolean = false;
    travelValue : string = 'No';
    travelOptions = ['Yes','No'];

    //travel form
    accommodationValue : string = 'No';
    accommodationOptions = ['Yes', 'No'];


    //food form
    displayB : string = 'none';
    displayL : string = 'none';
    displayD : string = 'none';
    displayO : string = 'none';

    constructor(
        private hotelService    :   HotelService,
        private foodService     :   FoodService,
        private activityService :   ActivityService,
        private packageService  :   CustomPackageService,
        private slimLoadingBarService : SlimLoadingBarService,
        private router          : Router
        ) 
        {
            
        }

    ngOnInit() {
        this.custom = this.packageService.getInitialData();

        console.log(this.custom.checkin)
        this.calculateDuration(this.custom.checkin, this.custom.checkout);
        this.setDaysArray(this.duration);
    }


    //Calculates the duration of the selected holiday
    calculateDuration(checkin : Date, checkout : Date) {
        var check = new Date(checkin);

        if(checkin == null) {
            this.router.navigate(["/home"]);    
        }

        var one_day=1000*60*60*24;  //used to convert the time calculated into days

        console.log(new Date(checkout));
        console.log(new Date(checkin));

        var duration = new Date(checkout).getTime() - new Date(checkin).getTime();

        this.duration = Math.round(duration/one_day);
    }


    /* Assigns each day to the days array
        This is required since angular cannot pass in a value in the *ngFor
          e.g cannot do *ngFor="let x = 1; x <= duration ..."
          ngFor can only loop through arrays.
    */
    setDaysArray(duration : number) {
        console.log(duration);

        for(let i = 1; i <= duration; i++) {
            this.days.push(i);
        }
        console.log(this.days);
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

    /* Retrieves all the hotel objects from the backend */
    getHotels() {
        console.log('retrieving hotels');
        this.startLoading();
       
        this.hotelService.getHotels()
            .subscribe((hotel : Hotel[]) => this.hotels = hotel);
        
        //fake loading bar
        setTimeout(() => {
            this.completeLoading();
        }, 1000);
    }

    /* Retrieves all food objects from the backend */
    getFood() {
        console.log('retrieving food');
        //this.hotelService.getMockFood().then((food: Food[]) => this.food = food);
        this.startLoading();
       
        this.foodService.getFood()
            .subscribe((food : Food[]) => this.food = food);
        
        //fake loading bar
        setTimeout(() => {
            this.completeLoading();
        }, 1000);
    }

    /* Retrieves all activity objects from the backend */
    getActivities() {
        console.log('retrieving Activities');
        //this.hotelService.getMockActivities().then((activity: Activity[]) => this.activities = activity);
        this.startLoading();
       
        this.activityService.getActivities()
            .subscribe((activity : Activity[]) => this.activities = activity);
        
        //fake loading bar
        setTimeout(() => {
            this.completeLoading();
        }, 1000);
    }

    //Navigation
    prevForm() {
        if(this.selected != 1) {
            this.setNavigation(this.selected - 1);
            console.info(this.selected);
        }
    }

    nextForm() {
        if(this.selected != 5) {
            this.setNavigation(this.selected + 1);
            console.info(this.selected);
        }
    }

    setNavigation(selection : number) {
        this.selected = selection;
        console.log('SELECTED VALUE: ', selection);

        switch(selection) {
            case 1: break;
            case 2: this.getHotels();       break;
            case 3: this.getFood();         break;
            case 4: this.getActivities();   break;
            case 5: break;
        }
    }

    setDays(selection : number) {
        this.selectedDay = selection;
    }

    expandB(){
        if(this.displayB == 'none') {
            this.displayB = 'block';
        } else { 
            this.displayB = 'none';
        }
    }

    expandL(){
        if(this.displayL == 'none') {
            this.displayL = 'block';
        } else {
            this.displayL = 'none';
        }
    }

    expandD(){
        if(this.displayD == 'none') {
            this.displayD = 'block';
        } else {
            this.displayD = 'none';
        }
    }

    expandO() {
        if(this.displayO == 'none') {
            this.displayO = 'block';
        } else {
            this.displayO = 'none';
        }
    }
    // setTravelValue(selection : boolean) {
    //     this.travelValue = selection;
    // }


    /* Item Selection */
    addHotel(accID : string, accName : string) {
        alert('You have selected: \n Item ID: ' + accID + '\n Name: ' + accName);
        this.custom.hotel = accName;

        console.info('[INFO] Added ', this.custom.hotel, ' to cart.');
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