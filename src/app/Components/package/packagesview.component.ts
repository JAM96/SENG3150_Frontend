import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route } from '@angular/router';
import {PackageList} from '../../Objects/Packages/PackageList';

import {PackageItems} from '../../Objects/Packages/PackageItems'

import {Accommodation} from '../../Objects/Accommodation/Accommodation';
import {Room} from '../../Objects/Accommodation/Room';
import {Feature} from '../../Objects/Accommodation/Feature';
import {FoodAndDrinks} from '../../Objects/FoodAndDrinks/FoodAndDrinks';
import {Activity} from '../../Objects/Activity/Activity';
import {CustomPackage} from '../../Objects/Packages/CustomPackage/CustomPackage';
import {TravelInformation} from '../../Objects/Packages/CustomPackage/TravelInformation';
import {Image} from '../../Objects/Image';

import {PackageService} from '../../Services/Package/packages.service';
import {DataService} from '../../Services/data.service';
import {AccommodationService} from '../../Services/Accommodation/accommodation.service';
import {FoodAndDrinksService} from '../../Services/FoodAndDrinks/food-and-drinks.service';
import {ImageService} from '../../Services/image.service';
import {ActivityService} from '../../Services/activity/activity.service';



@Component({
    moduleId: module.id,
    selector: 'packages',
    templateUrl: 'packagesview.component.html',
    providers: [PackageService]
})

export class PackagesComponent implements OnInit{
    private packages: PackageList[];
    private imageList : Image[];

    private imagesLoaded : boolean = false;
    private packagesLoaded : boolean = false;
    private foodAndDrinksLoaded : boolean = false;
    private accommodationLoaded : boolean = false;
    private activitiesLoaded : boolean = false;

    sub : any;

    minDate = new Date();

    startDate: Date;
    endDate: Date;
    category: string;

    guests : number = 0;

    constructor(
        private route: ActivatedRoute, 
        private packageService: PackageService,
        private data : DataService,
        private imageService : ImageService,
        private accommodationService : AccommodationService,
        private activityService : ActivityService,
        private foodAndDrinksService : FoodAndDrinksService,
    ) {
        data.setNavigation(2);
    }

    fetch() {
        //this._packageService.getMockPackages().then((packages: PackageList[]) => this.packages = packages);
        var itemsTemp : PackageItems[];
        //Load Accommodation
        var featuresTemp    : Feature[];
        var roomTemp        : Room[];
        var roomFeatures    : Feature[];
        var accommodationList : Accommodation[];

        //Load Activities
        var activities : Activity[];

        //Load food and drinks
        var foodAndDrinks : FoodAndDrinks[];


        console.log("attempting to packages");
        //Load Images
        this.imageService.fetchImages().subscribe((image : Image[]) => {
            this.imageList = image;
            this.imagesLoaded = true;
            console.log("Images have loaded");
            console.log(this.imageList);
            
            this.accommodationService.fetchAccommodation().subscribe((accommodation : Accommodation[]) => {
                accommodationList = accommodation;
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
                            accommodationList = this.assignAccommodation(accommodationList, featuresTemp, roomTemp, roomFeatures);
                            this.accommodationLoaded = true;

                            //Load Food and Drinks
                            this.foodAndDrinksService.fetchFoodAndDrinks().subscribe((foodAndDrinksData : FoodAndDrinks[]) => {
                                foodAndDrinks = foodAndDrinksData;
                                foodAndDrinks = this.assignFoodAndDrinks(foodAndDrinks);
                                
                                this.foodAndDrinksLoaded = true;
                                
                                //Assign images to the food and drinks
                                for(var i = 0; i < foodAndDrinks.length; i++) {
                                    foodAndDrinks[i].images = [];
                                    for(var j = 0; j < this.imageList.length; j++) {
                                        if(foodAndDrinks[i].foodAndDrinksID == this.imageList[j].associatedItemID) {
                                            foodAndDrinks[i].images.push(this.imageList[j]);
                                        }
                                    }
                                }

                                //assign empty image if there is no images for that food and drinks item
                                for(var i = 0; i < foodAndDrinks.length; i++) {
                                    if(foodAndDrinks[i].images[0] == null) {
                                        var img : Image = {imageID: '', description: '', fileName: '', fileType: 'none', associatedItemID: '', base64Equiv: ''};
                                        foodAndDrinks[i].images[0] = img;
                                    }
                                }
                                console.log("Images have been assigned, food and drinks is now complete");
                                console.log(foodAndDrinks);

                                //Load Activities
                                this.activityService.getActivities().subscribe((activities : Activity[]) => {
                                    activities = activities;
                                    this.activitiesLoaded = true;
                                    
                                    //Assign images to the activities
                                    for(var i = 0; i < activities.length; i++) {
                                        activities[i].images = [];
                                        for(var j = 0; j < this.imageList.length; j++) {
                                            if(activities[i].activityID == this.imageList[j].associatedItemID) {
                                                activities[i].images.push(this.imageList[j]);
                                            }
                                        }
                                    }

                                    //assign empty image if there is no images for that activity
                                    for(var i = 0; i < activities.length; i++) {
                                        if(activities[i].images[0] == null) {
                                            var img : Image = {imageID: '', description: '', fileName: '', fileType: 'none', associatedItemID: '', base64Equiv: ''};
                                            activities[i].images[0] = img;
                                        }
                                    }
                                    console.log("Images have been assigned, activities is now complete");
                                    console.log(activities);

                                    //Load Packages
                                    this.packageService.fetchPackages().subscribe((packages : PackageList[]) => {
                                        this.packages = packages;
                                        

                                        this.packageService.fetchPackageItems().subscribe((items : PackageItems[]) => {
                                            itemsTemp = items;
                                            this.assignItems(itemsTemp, accommodationList, activities, foodAndDrinks);
                                            //Assign images to the packages
                                            for(var i = 0; i < this.packages.length; i++) {
                                                this.packages[i].images = [];
                                                for(var j = 0; j < this.imageList.length; j++) {
                                                    if(this.packages[i].premadePackageID == this.imageList[j].associatedItemID) {
                                                        this.packages[i].images.push(this.imageList[j]);
                                                    }
                                                }
                                            }

                                            //assign empty image if there is no images for that packages item
                                            for(var i = 0; i < this.packages.length; i++) {
                                                if(this.packages[i].images[0] == null) {
                                                    var img : Image = {imageID: '', description: '', fileName: '', fileType: 'none', associatedItemID: '', base64Equiv: ''};
                                                    this.packages[i].images[0] = img;
                                                }
                                            }
                                            this.packagesLoaded = true;
                                            console.log("Images have been assigned, packages is now complete");
                                            console.log(this.packages);
                                        });
                                    });
                                });
                            });
                            
                            //Assign images to the accommodation
                            for(var i = 0; i < accommodationList.length; i++) {
                                accommodationList[i].images = [];
                                for(var j = 0; j < this.imageList.length; j++) {
                                    if(accommodationList[i].accommodationID == this.imageList[j].associatedItemID) {
                                        accommodationList[i].images.push(this.imageList[j]);
                                    }
                                }
                            }

                            //assign empty image if there is no images for that accommodation
                            for(var i = 0; i < accommodationList.length; i++) {
                                if(accommodationList[i].images[0] == null) {
                                    console.log("No images found");
                                    var img : Image = {imageID: '', description: '', fileName: '', fileType: 'none', associatedItemID: '', base64Equiv: ''};
                                    accommodationList[i].images[0] = img;
                                } 
                            }
                            console.log("Images have been assigned, accommodation is now complete");
                            console.log(accommodationList);
                        });
                    });
                });
            });  
        });
    }

    private assignFoodAndDrinks(foodAndDrinks : FoodAndDrinks[]) : FoodAndDrinks[] {
        for(var i = 0; i < foodAndDrinks.length; i++) {
            //Set the star array for each foodAndDrinks
            foodAndDrinks[i].stars = [];
            for(var j = 0; j < foodAndDrinks[i].starRating; j++) {
                foodAndDrinks[i].stars[j] = j;
            }
            console.log(foodAndDrinks[i].stars);

            //Assign the rating description for each foodAndDrinks
            switch(foodAndDrinks[i].userRating) {
                case 1: foodAndDrinks[i].rating = "Bad"; break;
                case 2: foodAndDrinks[i].rating = "Okay"; break;
                case 3: foodAndDrinks[i].rating = "Good"; break;
                case 4: foodAndDrinks[i].rating = "Great"; break;
                case 5: foodAndDrinks[i].rating = "Fabulous!"; break;
                default: foodAndDrinks[i].rating = ""; break;
            }

            //Assign the expense rating description for each foodAndDrinks
            foodAndDrinks[i].expense = [];
            for(var e = 0; e < foodAndDrinks[i].expenseRating; e++) {
                foodAndDrinks[i].expense[e] = e;
            }
        }

        return foodAndDrinks;
    }

    private assignAccommodation(accommodationList : Accommodation[], features : Feature[], rooms : Room[], roomFeatures : Feature[]) : Accommodation[] {
        //Set the accommodation star array and rating
        for(var i = 0; i < accommodationList.length; i++) {
            //Set the star array for each accommodationList
            accommodationList[i].accommodationStars = [];
            for(var j = 0; j < accommodationList[i].accommodationStarRating; j++) {
                accommodationList[i].accommodationStars[j] = j;
            }
            console.log(accommodationList[i].accommodationStars);

            //Assign the rating description for each accommodationList
            switch(accommodationList[i].accommodationUserRating) {
                case 1: accommodationList[i].accommodationRating = "Bad"; break;
                case 2: accommodationList[i].accommodationRating = "Okay"; break;
                case 3: accommodationList[i].accommodationRating = "Good"; break;
                case 4: accommodationList[i].accommodationRating = "Great"; break;
                case 5: accommodationList[i].accommodationRating = "Fabulous!"; break;
                default: accommodationList[i].accommodationRating = ""; break;
            }
        }

        //Assigning Features
        console.log("Assigning module: ");
        for(var i = 0; i < accommodationList.length; i++){
            //initialise features and room of each accommodation
            accommodationList[i].features = [];
            accommodationList[i].room = [];
            
            console.log("initialising done, now assiging features");

            //Assign Features to the accommodationList
            for(var j = 0; j < features.length; j++) 
                if(accommodationList[i].accommodationID == features[j].accommodationID) 
                    accommodationList[i].features.push(features[j]);

            //Assign rooms to the accommodationList
            console.log("now assigning rooms");
            for(var j = 0; j < rooms.length; j++) 
                if(accommodationList[i].accommodationID == rooms[j].accommodationID) 
                    accommodationList[i].room.push(rooms[j]);
        }

        //Obtain the cheapest room and set the price of the item
        console.log("finding cheapest price");
        for(var i = 0; i < accommodationList.length; i++) {
            if(accommodationList[i].room[0] != null) {
                console.log("Room price for 0 is defined")
                var price = accommodationList[i].room[0].roomPrice;
                
                for(var j = 0; j < accommodationList[i].room.length; j++){
                    if(price <= accommodationList[i].room[j].roomPrice) {
                        price = accommodationList[i].room[j].roomPrice;
                        break;
                    }
                }
                accommodationList[i].pricePerNight = price;
            } else {
                accommodationList[i].pricePerNight = 0;
            }
        }

        //Assigning the top 3 features of the accommodation
        console.log("Assigning top features");
        for(var i = 0; i < accommodationList.length; i++){
            accommodationList[i].topFeatures = []; //initialise top feature array

            //assign the first 3 features to the correct accommodation
            for(var j = 0; j < 3; j++)
                if(accommodationList[i].features[0] != null) 
                    accommodationList[i].topFeatures.push(accommodationList[i].features[j]);
        }

        return accommodationList;
    }

    assignItems(data : PackageItems[], accommodation : Accommodation[], activities : Activity[], foodAndDrinks : FoodAndDrinks[]) {
        for(var i = 0; i < this.packages.length; i++) {
            //initialise arrays in object
            this.packages[i].restaurants = [];
            this.packages[i].activities = [];

            for(var j = 0; j < data.length; j++) {
                if(data[j].itemCategory == "foodAndDrinks") {
                    if(data[j].premadePackageID == this.packages[i].premadePackageID) {
                        for(var f = 0; f < foodAndDrinks.length; f++) {
                            if(foodAndDrinks[f].foodAndDrinksID == data[j].itemID) {
                                this.packages[i].restaurants.push(foodAndDrinks[f]);
                            }
                        }
                    }
                }
                else if(data[j].itemCategory == "activity") {
                    if(data[j].premadePackageID == this.packages[i].premadePackageID) {
                        for(var a = 0; a < activities.length; a ++) {
                            if(activities[a].activityID == data[j].itemID) {
                                this.packages[i].activities.push(activities[a]);
                            }
                        }
                    }
                }
            }

            //Assign accommodation from id
            for(var acc = 0; acc < accommodation.length; acc++) {
                if(accommodation[acc].accommodationID == this.packages[i].accommodationID) {
                    this.packages[i].accommodation = accommodation[acc];
                }
            }
        }

        //if package does not have a package item
        // for(var i = 0; i < this.packages.length; i++) {
        //     if(this.packages[i].restaurants[0] == null) {
        //         this.packages[i].restaurants
        //     }
        // }
    }

    ngOnInit() {
        this.fetch();

        this.sub = this.route.params.subscribe(params => {
          this.startDate = params['startDate'];
          this.endDate = params['endDate'];
          this.category = params['category'];
        }); 
    }

    private checkLoad() : boolean {
        if(this.imagesLoaded && this.packagesLoaded) {
            return true;
        } else {
            return false;
        }
    }
}