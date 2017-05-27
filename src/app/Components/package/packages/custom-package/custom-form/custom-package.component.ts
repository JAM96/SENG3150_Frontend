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
    //Data from previous form
    custom : CustomPackage;

    //Objects
    hotels : Hotel[];
    food   : Food[];
    activities  : Activity[];

    //View variables
    selected : number = 3;
    days : number[] = [1,2,3,4,5];
    selectedDay : number = 3;
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
        private slimLoadingBarService : SlimLoadingBarService
        ) 
        {
            
        }

    ngOnInit() {
        this.custom = this.packageService.getInitialData();
    }

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

    public hotelsX : Hotel[]
    public testString : string = "hello world";

    getHotels() {
        this.startLoading();
        console.log('retrieving hotels');
        //this.hotelService.getMockHotels().then((hotels: Hotel[]) => this.hotels = hotels);
        this.hotelService.getHotels()
            .subscribe((hotel : Hotel[]) => this.hotels = hotel)
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
        }, 3000);
    }

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
}