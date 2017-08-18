/*
 * SERVICE NAME: Accommodation
 * Role: Retrieving the accommodation data from the backend
 * Created By: Jack Mennie
 * Date Completed: 14/08/17 
 */

//Imports
    import {Injectable} from '@angular/core';
    import {Accommodation} from '../../Objects/Accommodation/Accommodation';
    import {Room} from '../../Objects/Accommodation/Room';
    import {Feature} from '../../Objects/Accommodation/Feature';
    import {ACCOMMODATION_LIST} from '../../Objects/Accommodation/MockData/Mock-Accommodation';
    import {DataService} from '../data.service';
    import {Http, Response} from "@angular/http";
    import { Observable }     from 'rxjs/Observable';
    import 'rxjs/add/operator/catch';
    import 'rxjs/add/operator/map';
//end imports

@Injectable()
export class AccommodationService {
    accommodation               : Accommodation[];
    accommodationFeatures       : Feature[];
    accommodationRoomFeatures   : Feature[];
    accommodationRooms          : Room[];

    constructor(private http : Http, public data : DataService) {
        console.log("Fectching from the database");
        this.fetchAccommodation().subscribe((accommodation : Accommodation[]) => this.accommodation = accommodation);
        this.fetchAccommodationFeatures().subscribe((feature : Feature[]) => this.accommodationFeatures = feature);
        this.fetchAccommodationRooms().subscribe((room : Room[])=> this.accommodationRooms = room);
        this.fetchAccommodationRoomFeatures().subscribe((roomFeature : Feature[]) => this.accommodationRoomFeatures = roomFeature);
        console.log("DONE");
    }

    ngOnInit() {
        
    }
    
    fetchAccommodation() {
        var url = this.data.getApiUrl('accommodation');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Could not retrieve Accommodation'));
    }

    fetchAccommodationFeatures() {
        var url = this.data.getApiUrl('accommodationFeatures');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Could not retrieve Accommodation features'));
    }

    fetchAccommodationRooms() {
        var url = this.data.getApiUrl('accommodationRooms');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Could not retrieve Accommodation'));
    }
    
    fetchAccommodationRoomFeatures() {
        var url = this.data.getApiUrl('accommodationRoomFeatures');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Could not retrieve Accommodation'));
    }
    
    getAccommodation() {
        console.log('Returning accommodation promise' + this.accommodation);
        
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

        this.assign();
        this.getCheapestPrice();

        return Promise.resolve(this.accommodation);
    }

    getAccommodationFeatures() {
        console.log(this.accommodationFeatures);
       return Promise.resolve(this.accommodationFeatures);
    }
    
    getAccommodationRooms() {
       return Promise.resolve(this.accommodationRooms);
    }

    getAccommodationRoomFeatures() {
       return Promise.resolve(this.accommodationRoomFeatures);
    }

    getMockAccommodation() {
        return Promise.resolve(ACCOMMODATION_LIST);
    }

    //Accommodation Features and rooms assigning
    assign() {
        console.log("Assigning module: ");

        for(var i = 0; i < this.accommodation.length; i++){
            //initialise features and room of each accommodation
            this.accommodation[i].features = [];
            this.accommodation[i].room = [];
            
            console.log("initialising done, now assiging features");
            //Assign Features to the accommodation
            for(var j = 0; j < this.accommodationFeatures.length; j++) 
                if(this.accommodation[i].accommodationID == this.accommodationFeatures[j].accommodationID) 
                    this.accommodation[i].features.push(this.accommodationFeatures[j]);
            //Assign rooms to the accommodation


            console.log("now assigning rooms");
            for(var j = 0; j < this.accommodationRooms.length; j++) 
                if(this.accommodation[i].accommodationID == this.accommodationRooms[j].accommodationID) 
                    this.accommodation[i].room.push(this.accommodationRooms[j]);
        }

        console.log(this.accommodation);
    }

    getCheapestPrice() {
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
    }
}