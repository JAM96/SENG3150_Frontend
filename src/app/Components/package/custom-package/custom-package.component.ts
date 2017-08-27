//Core Imports
    import {Component, Input, OnInit, Inject} from '@angular/core';
    import {MdDialog, MdDialogRef, MD_DIALOG_DATA, Sort} from '@angular/material';
    import {Router} from '@angular/router';
    import { Md2Dialog } from 'md2';

//External Components
    import {ActivityComponent} from '../../../Components/activities/activity.component';
    import {FoodAndDrinksComponent} from '../../../Components/food-and-drinks/food-and-drinks.component';
//Objects
    import {Accommodation} from '../../../Objects/Accommodation/Accommodation';
    import {Room} from '../../../Objects/Accommodation/Room';
    import {Feature} from '../../../Objects/Accommodation/Feature';
    import {FoodAndDrinks} from '../../../Objects/FoodAndDrinks/FoodAndDrinks';
    import {Activity} from '../../../Objects/Activity/Activity';
    import {CustomPackage} from '../../../Objects/Packages/CustomPackage/CustomPackage';
    import {TravelInformation} from '../../../Objects/Packages/CustomPackage/TravelInformation';
    import {Image} from '../../../Objects/Image';
//Services
    import {AccommodationService} from '../../../Services/Accommodation/accommodation.service';
    import {FoodAndDrinksService} from '../../../Services/FoodAndDrinks/food-and-drinks.service';
    import {ImageService} from '../../../Services/image.service';
    import {ActivityService} from '../../../Services/activity/activity.service';
    import {IndividualFoodAndDrinksService} from '../../../Services/FoodAndDrinks/individual-food-and-drinks.service';
    import {IndividualActivityService} from '../../../Services/Activity/individual-activity.service';
    import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
    import {CustomPackageService} from '../../../Services/Package/custom-package.service';
//PDF Creator
    import jsPDF from 'jspdf';
    // declare var jquery:any;
    declare var $ :any;

//Custom Package Component
@Component({
    moduleId: module.id,
    selector: 'custom-package',
    templateUrl: 'custom-package.component.html',
    providers: [],
    styles: [`agm-map {
        height: 300px;
        width: 100%;
    }`],
})
export class CustomPackageComponent implements OnInit{

    custom : CustomPackage; //CustomPackage object for storing all the package items
    public budget : number;

    //Package Items
    accommodationList : Accommodation[];//list of accomodation options in Newcastle
    foodAndDrinks   : FoodAndDrinks[];            //list of restaurants and bars in Newcastle
    activities  : Activity[];   //list of events and activities in Newcastle
    imageList   : Image[];

    isLoaded = [
        {type: 'accommodation', value: false},
        {type: 'restauarants',  value: false},
        {type: 'activities',    value: false},
    ]

    //View variables
    selected : number;      //Tab selection, 1=Travel, 2=Accommodation, 3=Restauarants, 4=Activities, 5=Cart

    //Restaurants and Activities View
    days : number[] = [];       //Used to store the amount of days the user is staying
    selectedDay : number;   //The day that has been selected for input of the package item
    duration : number;          //The amount of days the user is staying in Newcastle

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
    cartForm = [
        {display: 'foodanddrinks', condition: 'none', value: 1, eatingTime: 'Breakfast'},
        {display: 'displayL', condition: 'none', value: 2, eatingTime: 'Lunch'},
        {display: 'displayD', condition: 'none', value: 3, eatingTime: 'Dinner'},
        {display: 'displayO', condition: 'none', value: 4, eatingTime: 'Other'}
    ]   // this object will be in charge of iterating through the four times for food.

    //barcode
    elementType = 'svg';
    value = 'someValue12340987';
    format = 'CODE128';
    //format = 'upc';
    lineColor = '#000000';
    width = 2;
    height = 100;
    displayValue = true;
    fontOptions = '';
    font = 'monospace';
    textAlign = 'center';
    textPosition = 'bottom';
    textMargin = 2;
    fontSize = 20;
    background = 'transparent';
    margin = 10;
    marginTop = 10;
    marginBottom = 10;
    marginLeft = 10;
    marginRight = 10;


    //how to display items
    view : number  = 1;
    sortValue : string = "Name";

    //View Items
    dialogSelection : number = 1;
    viewAccommodation : Accommodation = new Accommodation; //this stores the data of a selected accommodation
    sortedData;
    
    //declare services
    constructor(
        private accommodationService            :   AccommodationService,
        private foodAndDrinksService            :   FoodAndDrinksService,
        private activityService                 :   ActivityService,
        private imageService                    :   ImageService,
        private packageService                  :   CustomPackageService,
        private individualFoodAndDrinksService  :   IndividualFoodAndDrinksService,
        private individualActivityService       :   IndividualActivityService,
        private slimLoadingBarService           :   SlimLoadingBarService,
        private router                          :   Router,
        public dialog                           :   MdDialog
        ) {

            this.getImages();
        }

    ngOnInit() {
        console.log('[INFO] Custom package creation form is initialising...')
        //Grab the data entered from the initial form (home page)
        this.custom = this.packageService.getPackage();
        console.log("Imported Package: " + this.custom);
        
        // if(this.custom.checkin == null) {
        //     console.log("Invalid object");
        //     this.router.navigate(['/']);
        // }

        this.custom.checkin = new Date('February 4, 2016 10:13:00'); //TEMP While testing module
        this.custom.checkout = new Date('February 6, 2016 10:13:00'); //as above

        if(this.custom.navigation == null) {
            console.log("Setting up custom package for the first time");
            this.selected = 1;
            this.selectedDay = 1;
            this.travelValue = 'No'
            this.budget = this.custom.budget;
            this.custom.packageCost = 0;

            setTimeout(() => {
                this.getImages();
            }, 2000)
           
        } else {
            console.log("Package is already created");
            this.selected = this.custom.navigation;
            this.selectedDay = this.custom.aSelectedDay;
            this.travelValue = this.custom.requireTravel;
            this.budget = this.custom.budget;
            
            if(this.custom.accommodation != null) {
                this.selectedAccommodation = this.custom.accommodation.accommodationID;
                this.selectedAccommodationName = this.custom.accommodation.accommodationName;
                this.previousSelectedAccommodation = this.custom.previousSelectedAccommodation;
            }

            this.getAccommodation();
            this.getActivities();
            this.getFoodAndDrinks();
            this.getImages();
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

        this.custom.budget = this.custom.budget * this.duration;
    }


    /* Assigns each day to the days array
        This is required since angular cannot pass in a value in the *ngFor
          e.g cannot do *ngFor="let x = 1; x <= duration ..."
          ngFor can only loop through arrays.
    */
    setDaysArray(duration : number) : void{
        console.log('[INFO] Duration: ', duration);

        for(let i = 1; i <= duration; i++) {
            this.days.push(i);
        }
        console.log('[INFO] Days Array: ', this.days);
    }

    changeView(value : number) : void {
        this.view = value;
    }

    changeSort(value : string) : void {
        this.sortValue = value;
    }

    viewItem(item : number, accommodation : Accommodation, foodAndDrinks : FoodAndDrinks, activity : Activity, dialog : Md2Dialog){
        //item 1: Accommodation, 2: Food and Drinks, 3: Activities

        switch(item) {
            case 1:
                this.viewAccommodation = accommodation;
                dialog.open();
                break;
            case 2: 
                this.individualFoodAndDrinksService.setFoodAndDrinks(foodAndDrinks);
                let dialogRef2 = this.dialog.open(FoodAndDrinksComponent);
                dialogRef2.afterClosed().subscribe(result => {});
                break;
            case 3: 
                this.individualActivityService.setActivity(activity);
                let dialogRef3 = this.dialog.open(ActivityComponent);
                dialogRef3.afterClosed().subscribe(result => {});
                break;
        }   
    }

    open(dialog: Md2Dialog) {
        dialog.open();
    }

    close(dialog: any) {
        dialog.close();
      }

    setDialogNavigation(value : number) {
        this.dialogSelection = value;
    }

    startLoading() {
        this.slimLoadingBarService.start();
    }
    stopLoading() {
        this.slimLoadingBarService.stop();
    }
    completeLoading() {
        this.slimLoadingBarService.complete();
    }

    //Navigation
    setNavigation(selection : number) {
        /*
            When the user has selected the tab, it will then load the data.
            This will prevent long waiting time initially while the page is loading
            since the actual data has not been loaded yet.
        */
        this.selected = selection;
        console.log('[INFO] SELECTED VALUE: ', selection);

        this.getImages();

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

    setDays(selection : number) {
        this.selectedDay = selection;
    }

    expand(value : number) {
        if(this.cartForm[value-1].condition == 'none') {
            this.cartForm[value-1].condition = 'block';
        } else {
            this.cartForm[value-1].condition = 'none';
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

            if(result != null) {
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
            }
        });
    }

    setFood(foodAndDrinks : FoodAndDrinks, setForAll : boolean) {
        //this.foodForm
        var selectedTime : string;

        let dialogRef = this.dialog.open(AddFoodAndDrinksComponent, {
            data: foodAndDrinks
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("selected time is: ");
            console.log(result);    

            if(result != null) {
                //If user has selected a value then continue adding item to the package
                if(setForAll) {
                    //if the user has selected to add to all days
                    for(var i = 0; i < this.days.length; i++) {
                        //create a temp object and deep copy the foodAndDrinks object to it
                        var temp = Object.assign({}, foodAndDrinks);

                        //set the day and time selected to the temp object
                        temp.selectedDay = this.days[i];
                        temp.selectedTime = result;

                        //push to the foodAndDrinks array
                        this.custom.foodAndDrinks.push(temp);
                        this.custom.selectedFoodAndDrinks.push(temp.foodAndDrinksID+this.days[i]);
                    }
                } else {
                    //user has selected to add to day selected
                    foodAndDrinks.selectedDay = this.selectedDay;
                    foodAndDrinks.selectedTime = result;
                    this.custom.foodAndDrinks.push(foodAndDrinks);
                    this.custom.selectedFoodAndDrinks.push(foodAndDrinks.foodAndDrinksID+this.selectedDay);
                }

                console.info('[INFO] Added ', this.custom.foodAndDrinks, ' to cart.');
            }
        });
    }

    removeFood(foodAndDrinks : FoodAndDrinks, setForAll : boolean) {
        if(setForAll) {
            var temp = this.custom.foodAndDrinks.filter(function(el) {
                return el.foodAndDrinksID !== foodAndDrinks.foodAndDrinksID;
            })

            this.custom.foodAndDrinks = temp;

            for(var i = 0; i < this.custom.selectedFoodAndDrinks.length; i++) {
                for(var j = 1; j <= this.days.length; j++) {
                    if(this.custom.selectedFoodAndDrinks[i] == foodAndDrinks.foodAndDrinksID + j){
                        this.custom.selectedFoodAndDrinks.splice(j, 1);
                    }
                }
            }
        } else {
            for(var i = 0; i < this.custom.foodAndDrinks.length; i++) {
                if(this.custom.foodAndDrinks[i].foodAndDrinksID == foodAndDrinks.foodAndDrinksID
                    && this.custom.foodAndDrinks[i].selectedDay == this.selectedDay
                ) {
                    this.custom.foodAndDrinks.splice(i, 1);
                }
            }

            for(var j = 0; j < this.custom.selectedFoodAndDrinks.length; j++) {
                if(this.custom.selectedFoodAndDrinks[j] == foodAndDrinks.foodAndDrinksID + this.selectedDay){
                    this.custom.selectedFoodAndDrinks.splice(j, 1);
                }
            }
        }

        console.log(this.custom.foodAndDrinks);
    }
    
    /*  The checkFood function goes through the selecedFoodAndDrinks array
        and compares the item id and the selected item id
        
        If they are equal, then item has been added to the package, hence show 'Remove Item'
        If they are not equal, then item has not been added to the package, hence show 'Add Item'
    */
    checkFood(item : FoodAndDrinks) : boolean {
        for(var i = 0; i < this.custom.selectedFoodAndDrinks.length; i++)
            if(item.foodAndDrinksID + this.selectedDay == this.custom.selectedFoodAndDrinks[i]) 
                return false;
        return true;
    }

    setActivity(activity : Activity) {
        //this.foodForm
        var selectedTime : string;

        let dialogRef = this.dialog.open(AddActivityComponent, {
            data: activity
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("selected time is: ");
            console.log(result);  
              
            if(result != null) {
                activity.selectedDay = this.selectedDay;
                activity.selectedTime = result;
                this.custom.activity.push(activity);
                this.custom.selectedActivities.push(activity.activityID+this.selectedDay);

                this.custom.packageCost = this.custom.packageCost + activity.price;

                console.info('[INFO] Added ', this.custom.activity, ' to cart.');
            }
        });
    }

    removeActivity(activity : Activity) {
        for(var i = 0; i < this.custom.activity.length; i++) {
            if(this.custom.activity[i].activityID == activity.activityID
                && this.custom.activity[i].selectedDay == this.selectedDay
            ) {
                this.custom.activity.splice(i, 1);
            }
        }

        for(var j = 0; j < this.custom.selectedActivities.length; j++) {
            if(this.custom.selectedActivities[j] == activity.activityID + this.selectedDay){
                this.custom.selectedActivities.splice(j, 1);
            }
        }
        
        this.custom.packageCost = this.custom.packageCost - activity.price;
        console.log(this.custom.activity);
    }

    checkActivity(item : Activity) : boolean {
        for(var i = 0; i < this.custom.selectedActivities.length; i++)
            if(item.activityID + this.selectedDay == this.custom.selectedActivities[i]) 
                return false;
        return true;
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

    getImages() : void {
        this.imageService.getImages()
            .then((image : Image[]) => this.imageList = image)
            .then(() => console.log("images loaded: "))
            .then(() => console.log(this.imageList));
        
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

        this.startLoading();
        //this.foodAndDrinksService.getMockFood().then((fad: FoodAndDrinks[]) => this.foodAndDrinks = fad)
        
        this.foodAndDrinksService.getFoodAndDrinks()
            .then((fad : FoodAndDrinks[]) => this.foodAndDrinks = fad)
             .then(() => this.completeLoading());

       
        if(this.custom.foodAndDrinks == null) {
            this.custom.foodAndDrinks = [];
            this.custom.selectedFoodAndDrinks = [];
        }
    }

    /* Retrieves all activity objects from the backend */
    getActivities() {
        console.log('retrieving Activities');
        //this.activityService.getMockActivities().then((activity: Activity[]) => this.activities = activity);
        //this.startLoading();
       
        this.activityService.getActivities().subscribe((activity : Activity[]) => this.activities = activity);
        
        this.custom.activity = [];
        this.custom.selectedActivities = [];
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

        this.packageService.setPackage(this.custom);

        sessionStorage.setItem('packageForm', JSON.stringify(this.custom));

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

    createPDF(){
        let printContents, popupWin;
        printContents = document.getElementById('cart').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
          <html>
            <head>
              <title>Print tab</title>
              <style>
              //........Customized style.......
              </style>
            </head>
        <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        popupWin.document.close();
    }

    sortData(sort: Sort) {
        const data = this.viewAccommodation.room.slice();
        if (!sort.active || sort.direction == '') {
          this.sortedData = data;
          return;
        }
    
        this.sortedData = data.sort((a, b) => {
          let isAsc = sort.direction == 'asc';
          switch (sort.active) {
            case 'room': return compare(a.roomTitle, b.roomTitle, isAsc);
            case 'features': return compare(+a.features, +b.features, isAsc);
            case 'price': return compare(+a.roomPrice, +b.roomPrice, isAsc);
            default: return 0;
          }
        });
      }
}

function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
/*
###################################################################################################################################
###################################################################################################################################
###################################################################################################################################
###################################################################################################################################
###################################################################################################################################


OTHER COMPONENTS

###################################################################################################################################
###################################################################################################################################
###################################################################################################################################

*/

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

@Component({
    moduleId: module.id,
    selector: 'AddFoodAndDrinksComponent',
    templateUrl: 'AddFoodAndDrinksComponent.html'
})
export class AddFoodAndDrinksComponent{
    foodAndDrinks : FoodAndDrinks;

    constructor (public dialogRef: MdDialogRef<AddFoodAndDrinksComponent>,
                @Inject(MD_DIALOG_DATA) public data: any) {
                    this.foodAndDrinks = data;
                    console.log("imported value to dialog is: ");
                    console.log(this.foodAndDrinks);
                }

    checkMenuType() : boolean {
        for(var i = 0; i < this.foodAndDrinks.menuType.length; i++) {
            if(this.foodAndDrinks.menuType[i].tagString == 'Bar') {
                return true;
            }
        }

        return false;
    }
}

@Component({
    moduleId: module.id,
    selector: 'AddActivityComponent',
    templateUrl: 'AddActivityComponent.html'
})
export class AddActivityComponent{
    activity : Activity;
    time : Date = new Date();

    constructor (public dialogRef: MdDialogRef<AddActivityComponent>,
                @Inject(MD_DIALOG_DATA) public data: any) {
                    this.activity = data;
                    console.log("imported value to dialog is: ");
                    console.log(this.activity);
                }
    returnObj() : string{
        return '' + this.time.getHours() + this.time.getMinutes();
    }
}
