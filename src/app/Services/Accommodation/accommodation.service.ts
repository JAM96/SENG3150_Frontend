/*
 * SERVICE NAME: Accommodation
 * Role: Retrieving the accommodation data from the backend
 * Created By: Jack Mennie
 * Date Completed: 14/08/17 
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
        import {Accommodation} from '../../Objects/Accommodation/Accommodation';
        import {Room} from '../../Objects/Accommodation/Room';
        import {Feature} from '../../Objects/Accommodation/Feature';
        import {Image} from '../../Objects/Image';
//End Imports

@Injectable()
export class AccommodationService {
    private accommodationLoaded : boolean = false; 

    private accommodation : Accommodation[];
    private room : Room[];
    private features : Feature[];
    private roomFeatures : Feature[];

    constructor(private http : Http, private data : DataService) {}
    
    /**
     * Fetches accommodation from the database
     */
    public fetchAccommodation() : Observable<any> {
        var url = this.data.getApiUrl('accommodation');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
    }

    /**
     * Fetches accommodation features from the database
     */
    public fetchAccommodationFeatures() : Observable<any> {
        var url = this.data.getApiUrl('accommodationFeatures');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
    }

    /**
     * Fetches rooms from the database
     */
    public fetchAccommodationRooms() : Observable<any> {
        var url = this.data.getApiUrl('accommodationRooms');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
    }
    
    /**
     * Fetches room features from the database
     */
    public fetchAccommodationRoomFeatures() : Observable<any> {
        var url = this.data.getApiUrl('accommodationRoomFeatures');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
    }

    //Getters

    public isAccommodationLoaded() : boolean {
        return this.accommodationLoaded;
    }

    public getAccommodation() : Accommodation[] {
        return this.accommodation;
    }

    //Setters

    public setAccommodationLoaded(value : boolean) : void {
        this.accommodationLoaded = value;
    }

    public setAccommodation(data : Accommodation[]) : void {
        this.accommodation = data;
    }

    public setRooms(data : Room[]) : void {
        this.room = data;
    }

    public setFeatures(data : Feature[]) : void {
        this.features = data;
    }

    public setRoomFeatures(data : Feature[]) : void {
        this.roomFeatures = data;
    }

    /**
     * Assign is called once all the data from the database is loaded
     * Each room, accommodation feature and room feature is seperated but have a common ID
     * This function maps each common ID with each other
     * 
     * This function also initialises the star rating array and the rating string.
     * Angular requires an array to iterate through hence the necessity to create the
     * star rating array.
     * 
     * This function is called from external components hence return the updated 
     * accommodation array
     */
    public assign() : Accommodation[] {
        //Set the accommodation star array and rating
        for(var i = 0; i < this.accommodation.length; i++) {
            //Set the star array for each accommodation
            this.accommodation[i].accommodationStars = [];
            for(var j = 0; j < this.accommodation[i].accommodationStarRating; j++) {
                this.accommodation[i].accommodationStars[j] = j;
            }
            console.log(this.accommodation[i].accommodationStars);

            //Assign the rating description for each accommodation
            switch(this.accommodation[i].accommodationUserRating) {
                case 1: this.accommodation[i].accommodationRating = "Bad"; break;
                case 2: this.accommodation[i].accommodationRating = "Okay"; break;
                case 3: this.accommodation[i].accommodationRating = "Good"; break;
                case 4: this.accommodation[i].accommodationRating = "Great"; break;
                case 5: this.accommodation[i].accommodationRating = "Fabulous!"; break;
                default: this.accommodation[i].accommodationRating = ""; break;
            }
        }

        //Assigning Features
        console.log("Assigning module: ");
        for(var i = 0; i < this.accommodation.length; i++){
            //initialise features and room of each accommodation
            this.accommodation[i].features = [];
            this.accommodation[i].room = [];
            
            console.log("initialising done, now assiging features");

            //Assign Features to the accommodation
            for(var j = 0; j < this.features.length; j++) 
                if(this.accommodation[i].accommodationID == this.features[j].accommodationID) 
                    this.accommodation[i].features.push(this.features[j]);

            //Assign rooms to the accommodation
            console.log("now assigning rooms");
            for(var j = 0; j < this.room.length; j++) 
                if(this.accommodation[i].accommodationID == this.room[j].accommodationID) 
                    this.accommodation[i].room.push(this.room[j]);
        }

        //Obtain the cheapest room and set the price of the item
        console.log("finding cheapest price");
        for(var i = 0; i < this.accommodation.length; i++) {
            if(this.accommodation[i].room[0] != null) {
                console.log("Room price for 0 is defined")
                var price = this.accommodation[i].room[0].roomPrice;
                
                for(var j = 0; j < this.accommodation[i].room.length; j++){
                    if(price <= this.accommodation[i].room[j].roomPrice) {
                        price = this.accommodation[i].room[j].roomPrice;
                        break;
                    }
                }
                this.accommodation[i].pricePerNight = price;
            } else {
                this.accommodation[i].pricePerNight = 0;
            }
        }

        //Assigning the top 3 features of the accommodation
        console.log("Assigning top features");
        for(var i = 0; i < this.accommodation.length; i++){
            this.accommodation[i].topFeatures = []; //initialise top feature array

            //assign the first 3 features to the correct accommodation
            for(var j = 0; j < 3; j++)
                if(this.accommodation[i].features[0] != null) 
                    this.accommodation[i].topFeatures.push(this.accommodation[i].features[j]);
        }

        return this.accommodation;
    }

    //Assigns images to the accommodation object and returns it
    public assignImages(data : Image[]) : Accommodation[] {
        //Assign images to the accommodation
        for(var i = 0; i < this.accommodation.length; i++) {
            this.accommodation[i].images = [];
            for(var j = 0; j < data.length; j++) {
                if(this.accommodation[i].accommodationID == data[j].associatedItemID) {
                    this.accommodation[i].images.push(data[j]);
                }
            }
        }

        //assign empty image if there is no images for that accommodation
        for(var i = 0; i < this.accommodation.length; i++) {
            if(this.accommodation[i].images[0] == null) {
                console.log("No images found");
                var img : Image = {imageID: '', description: '', fileName: '', fileType: 'none', associatedItemID: '', base64Equiv: ''};
                this.accommodation[i].images[0] = img;
            } 
        }
        console.log("Images have been assigned, accommodation is now complete");
        console.log(this.accommodation);


        return this.accommodation;
    }
}