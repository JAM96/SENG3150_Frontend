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
import {ActivityService} from '../../Services/Activity/activity.service';



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
        var itemsTemp : PackageItems[];

        //Load Packages
        this.packageService.fetchPackages().subscribe((packages : PackageList[]) => {
            this.packages = packages;
            
            

            this.packageService.fetchPackageItems().subscribe((items : PackageItems[]) => {
                itemsTemp = items;
                this.assignItems(itemsTemp, 
                    this.accommodationService.getAccommodation(), 
                    this.activityService.getData(),
                    this.foodAndDrinksService.getData());
                this.packageService.setData(this.packages);
                this.packages = this.packageService.assignImages(this.imageService.getData())
                this.packagesLoaded = true;
                console.log("Images have been assigned, packages is now complete");
                console.log(this.packages);
            });
        });               
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
        if(this.imageService.isLoaded() && this.packagesLoaded) {
            return true;
        } else {
            return false;
        }
    }
}