import {Component} from '@angular/core';

//import objects
import {Accommodation} from '../../Objects/Accommodation/Accommodation';
import {Image} from '../../Objects/Image';
import {Feature} from '../../Objects/Accommodation/Feature';
import {Room} from '../../Objects/Accommodation/Room'


//import services
import {AccommodationService} from '../../Services/Accommodation/accommodation.service';
import {DataService} from '../../Services/data.service';
import {ImageService} from '../../Services/image.service'

@Component({
    moduleId: module.id,
    selector: 'accomodation-list',
    templateUrl: 'accommodationListView.component.html',
})

export class AccommodationListComponent {
    private view : number = 1;
    private imageList : Image[];
    private accommodationList : Accommodation[];

    private imagesLoaded : boolean = false;
    private accommodationLoaded : boolean = false;

    constructor(
        private data : DataService, 
        private accommodationService : AccommodationService,
        private imageService : ImageService,
    ) {
        data.setNavigation(6);
        this.fetch();
    }


    private fetch() : void {
        //Load Accommodation
        var featuresTemp    : Feature[];
        var roomTemp        : Room[];
        var roomFeatures    : Feature[];
        //Load Images
        this.imageService.fetchImages().subscribe((image : Image[]) => {
            this.imageList = image;
            this.imagesLoaded = true;
            console.log("Images have loaded");
            console.log(this.imageList);
        
            this.accommodationService.fetchAccommodation().subscribe((accommodation : Accommodation[]) => {
                this.accommodationList = accommodation;
                console.log("Accommodation is now loaded...");
                this.accommodationService.fetchAccommodationFeatures().subscribe((feature : Feature[]) => {
                    featuresTemp = feature;
                    console.log("Accommodation Features is now loaded...");
                    this.accommodationService.fetchAccommodationRooms().subscribe((room : Room[]) => {
                        roomTemp = room;
                        console.log("Accommodation rooms is now loaded...");
                        this.accommodationService.fetchAccommodationRoomFeatures().subscribe((roomFeature : Feature[]) => {
                            roomFeature = roomFeature;
                            console.log("Accommodation room features is now loaded...");
                            this.assignAccommodation(featuresTemp, roomTemp, roomFeatures);
                            this.accommodationLoaded = true;
                            
                            //Assign images to the accommodation
                            for(var i = 0; i < this.accommodationList.length; i++) {
                                this.accommodationList[i].images = [];
                                for(var j = 0; j < this.imageList.length; j++) {
                                    if(this.accommodationList[i].accommodationID == this.imageList[j].associatedItemID) {
                                        this.accommodationList[i].images.push(this.imageList[j]);
                                    }
                                }
                            }

                            //assign empty image if there is no images for that accommodation
                            for(var i = 0; i < this.accommodationList.length; i++) {
                                if(this.accommodationList[i].images[0] == null) {
                                    console.log("No images found");
                                    var img : Image = {imageID: '', description: '', fileName: '', fileType: 'none', associatedItemID: '', base64Equiv: ''};
                                    this.accommodationList[i].images[0] = img;
                                } 
                            }
                            console.log("Images have been assigned, accommodation is now complete");
                            console.log(this.accommodationList);
                        });
                    });
                });
            });   
        });
    }

    private assignAccommodation(features : Feature[], rooms : Room[], roomFeatures : Feature[]) : void {
        //Set the accommodation star array and rating
        for(var i = 0; i < this.accommodationList.length; i++) {
            //Set the star array for each accommodationList
            this.accommodationList[i].accommodationStars = [];
            for(var j = 0; j < this.accommodationList[i].accommodationStarRating; j++) {
                this.accommodationList[i].accommodationStars[j] = j;
            }
            console.log(this.accommodationList[i].accommodationStars);

            //Assign the rating description for each accommodationList
            switch(this.accommodationList[i].accommodationUserRating) {
                case 1: this.accommodationList[i].accommodationRating = "Bad"; break;
                case 2: this.accommodationList[i].accommodationRating = "Okay"; break;
                case 3: this.accommodationList[i].accommodationRating = "Good"; break;
                case 4: this.accommodationList[i].accommodationRating = "Great"; break;
                case 5: this.accommodationList[i].accommodationRating = "Fabulous!"; break;
                default: this.accommodationList[i].accommodationRating = ""; break;
            }
        }

        //Assigning Features
        console.log("Assigning module: ");
        for(var i = 0; i < this.accommodationList.length; i++){
            //initialise features and room of each accommodation
            this.accommodationList[i].features = [];
            this.accommodationList[i].room = [];
            
            console.log("initialising done, now assiging features");

            //Assign Features to the accommodationList
            for(var j = 0; j < features.length; j++) 
                if(this.accommodationList[i].accommodationID == features[j].accommodationID) 
                    this.accommodationList[i].features.push(features[j]);

            //Assign rooms to the accommodationList
            console.log("now assigning rooms");
            for(var j = 0; j < rooms.length; j++) 
                if(this.accommodationList[i].accommodationID == rooms[j].accommodationID) 
                    this.accommodationList[i].room.push(rooms[j]);
        }

        //Obtain the cheapest room and set the price of the item
        console.log("finding cheapest price");
        for(var i = 0; i < this.accommodationList.length; i++) {
            if(this.accommodationList[i].room[0] != null) {
                console.log("Room price for 0 is defined")
                var price = this.accommodationList[i].room[0].roomPrice;
                
                for(var j = 0; j < this.accommodationList[i].room.length; j++){
                    if(price <= this.accommodationList[i].room[j].roomPrice) {
                        price = this.accommodationList[i].room[j].roomPrice;
                        break;
                    }
                }
                this.accommodationList[i].pricePerNight = price;
            } else {
                this.accommodationList[i].pricePerNight = 0;
            }
        }

        //Assigning the top 3 features of the accommodation
        console.log("Assigning top features");
        for(var i = 0; i < this.accommodationList.length; i++){
            this.accommodationList[i].topFeatures = []; //initialise top feature array

            //assign the first 3 features to the correct accommodation
            for(var j = 0; j < 3; j++)
                if(this.accommodationList[i].features[0] != null) 
                    this.accommodationList[i].topFeatures.push(this.accommodationList[i].features[j]);
        }
    }

    private checkLoad() : boolean {
        if(this.imagesLoaded && this.accommodationLoaded) {
           // this.completeLoading();
            return true;
        } else {
            return false;
        }
    }
 }