/*
 * SERVICE NAME: Food and Drinks
 * Role: Retrieving the Food and drinks data from the backend
 */

//Imports
    //core imports
    import {Injectable} from '@angular/core';
    import {Http, Response} from "@angular/http";
    import {Observable}     from 'rxjs/Observable';
    import 'rxjs/add/operator/catch';
    import 'rxjs/add/operator/map';
//Data service
    import {DataService} from '../data.service';
//Objects
    import {FoodAndDrinks} from '../../Objects/FoodAndDrinks/FoodAndDrinks';
    import {Tag} from '../../Objects/Tag';
    import {BookingTime} from '../../Objects/BookingTime';
    import {Image} from '../../Objects/Image';
//End Imports

@Injectable()
export class FoodAndDrinksService {
    private foodAndDrinks : FoodAndDrinks[];
    private tags : Tag[];
    private bookingTimes: BookingTime[];
    
    private loaded : boolean = false;

    constructor(private http : Http, public data : DataService) {}
    
    public fetchFoodAndDrinks() : Observable<any> {
        var url = this.data.getApiUrl('food-and-drinks');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
       
    }

    public fetchFoodAndDrinksTime() : Observable<any> {
        var url = this.data.getApiUrl('food-and-drinks-times');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
    }

    public isLoaded() : boolean {
        return this.loaded;
    }

    public getData() : FoodAndDrinks[] {
        return this.foodAndDrinks;
    }

    public setFoodAndDrinks(data : FoodAndDrinks[]) : void {
        this.foodAndDrinks = data;
    }

    public setTags(data : Tag[]) : void {
        this.tags = data;
    }

    public setBookingTimes(data : BookingTime[]) : void {
        this.bookingTimes = data;
    }

    public setLoaded(value : boolean) : void {
        this.loaded = value;
    }

    /**
     * Assign is called once all the data from the database is loaded
     * Each tag and booking time is seperated but have a common ID
     * This function maps each common ID with each other
     * 
     * This function also initialises the star rating array and the rating string.
     * Angular requires an array to iterate through hence the necessity to create the
     * star rating array.
     * 
     * This function is called from external components hence return the updated 
     * food and drinks array
     */
    public assign() : FoodAndDrinks[] {
        for(var i = 0; i < this.foodAndDrinks.length; i++) {
            //Set the star array for each foodAndDrinks
            this.foodAndDrinks[i].stars = [];
            for(var j = 0; j < this.foodAndDrinks[i].starRating; j++) {
                this.foodAndDrinks[i].stars[j] = j;
            }
            console.log(this.foodAndDrinks[i].stars);

            //Assign the rating description for each foodAndDrinks
            switch(this.foodAndDrinks[i].userRating) {
                case 1: this.foodAndDrinks[i].rating = "Bad"; break;
                case 2: this.foodAndDrinks[i].rating = "Okay"; break;
                case 3: this.foodAndDrinks[i].rating = "Good"; break;
                case 4: this.foodAndDrinks[i].rating = "Great"; break;
                case 5: this.foodAndDrinks[i].rating = "Fabulous!"; break;
                default: this.foodAndDrinks[i].rating = ""; break;
            }

            //Assign the expense rating description for each foodAndDrinks
            this.foodAndDrinks[i].expense = [];
            for(var e = 0; e < this.foodAndDrinks[i].expenseRating; e++) {
                this.foodAndDrinks[i].expense[e] = e;
            }
            console.log(this.foodAndDrinks[i]);
        }

        //Assign Tags
        for(var i = 0; i < this.foodAndDrinks.length; i++){
            this.foodAndDrinks[i].menuType = [];

            for(var j = 0; j < this.tags.length; j++) {
                if(this.tags[j].itemID == this.foodAndDrinks[i].foodAndDrinksID) {
                    this.foodAndDrinks[i].menuType.push(this.tags[j]);
                }
            }
        }

        //assign booking times
        for(var i = 0; i < this.foodAndDrinks.length; i++){
            this.foodAndDrinks[i].timeAvailable = [];

            for(var j = 0; j < this.bookingTimes.length; j++) {
                if(this.bookingTimes[j].packageItemID == this.foodAndDrinks[i].foodAndDrinksID) {
                    this.foodAndDrinks[i].timeAvailable.push(this.bookingTimes[j]);
                }
            }
        }

        //return food and drinks
        return this.foodAndDrinks
    }

    //Assigns images to the foodAndDrinks object and returns it
    public assignImages(data : Image[]) : FoodAndDrinks[] {
        //Assign images to the foodAndDrinks
        for(var i = 0; i < this.foodAndDrinks.length; i++) {
            this.foodAndDrinks[i].images = [];
            for(var j = 0; j < data.length; j++) {
                if(this.foodAndDrinks[i].foodAndDrinksID == data[j].associatedItemID) {
                    this.foodAndDrinks[i].images.push(data[j]);
                }
            }
        }

        //assign empty image if there is no images for that foodAndDrinks
        for(var i = 0; i < this.foodAndDrinks.length; i++) {
            if(this.foodAndDrinks[i].images[0] == null) {
                console.log("No images found");
                var img : Image = {imageID: '', description: '', fileName: '', fileType: 'none', associatedItemID: '', mainAssociatedItemPhoto: false};
                this.foodAndDrinks[i].images[0] = img;
            } 
        }
        console.log("Images have been assigned, foodAndDrinks is now complete");
        console.log(this.foodAndDrinks);


        return this.foodAndDrinks;
    }
}