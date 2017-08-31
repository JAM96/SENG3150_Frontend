import {Component} from '@angular/core';

//import objects
import {FoodAndDrinks} from '../../../Objects/FoodAndDrinks/FoodAndDrinks';
import {Image} from '../../../Objects/Image';

//import services
import {FoodAndDrinksService} from '../../../Services/FoodAndDrinks/food-and-drinks.service';
import {DataService} from '../../../Services/data.service'
import {ImageService} from '../../../Services/image.service';

@Component({
    moduleId: module.id,
    selector: 'food-and-drinks-list',
    templateUrl: 'food-and-drinks-view.component.html',
})

export class FoodAndDrinksListComponent {
    private imageList : Image[];
    private foodAndDrinks : FoodAndDrinks[];

    private view : number = 1;

    private imagesLoaded : boolean = false;
    private foodAndDrinksLoaded : boolean = false;

    constructor(
        private data : DataService,
        private imageService : ImageService,
        private foodAndDrinksService : FoodAndDrinksService,
    ) {
        data.setNavigation(5);
        this.fetch();
    }


    private fetch() : void {
        console.log("attempting to fetch food and drinks");
        //Load Images
        if(!this.imageService.isLoaded()) {
            this.imageService.fetchImages().subscribe((image : Image[]) => {
                this.imageList = image;
                this.imagesLoaded = true;
                this.imageService.setLoaded(true);
                this.imageService.setData(this.imageList);

                console.log("Images have loaded");
                console.log(this.imageList);
                
                //Load Food and Drinks
                this.foodAndDrinksService.fetchFoodAndDrinks().subscribe((foodAndDrinks : FoodAndDrinks[]) => {
                    this.foodAndDrinks = foodAndDrinks;
                    this.assignFoodAndDrinks();
                    this.foodAndDrinksLoaded = true;
                    
                    //Assign images to the food and drinks
                    for(var i = 0; i < this.foodAndDrinks.length; i++) {
                        this.foodAndDrinks[i].images = [];
                        for(var j = 0; j < this.imageList.length; j++) {
                            if(this.foodAndDrinks[i].foodAndDrinksID == this.imageList[j].associatedItemID) {
                                this.foodAndDrinks[i].images.push(this.imageList[j]);
                            }
                        }
                    }

                    //assign empty image if there is no images for that food and drinks item
                    for(var i = 0; i < this.foodAndDrinks.length; i++) {
                        if(this.foodAndDrinks[i].images[0] == null) {
                            var img : Image = {imageID: '', description: '', fileName: '', fileType: 'none', associatedItemID: '', base64Equiv: ''};
                            this.foodAndDrinks[i].images[0] = img;
                        }
                    }
                    console.log("Images have been assigned, food and drinks is now complete");
                    console.log(this.foodAndDrinks);
                });
            });
        } else {
            console.log("Images have been loaded");
            this.imageList = this.imageService.getData();
            this.imagesLoaded = true;

            //Load Food and Drinks
            this.foodAndDrinksService.fetchFoodAndDrinks().subscribe((foodAndDrinks : FoodAndDrinks[]) => {
                this.foodAndDrinks = foodAndDrinks;
                this.assignFoodAndDrinks();
                this.foodAndDrinksLoaded = true;
                
                //Assign images to the food and drinks
                for(var i = 0; i < this.foodAndDrinks.length; i++) {
                    this.foodAndDrinks[i].images = [];
                    for(var j = 0; j < this.imageList.length; j++) {
                        if(this.foodAndDrinks[i].foodAndDrinksID == this.imageList[j].associatedItemID) {
                            this.foodAndDrinks[i].images.push(this.imageList[j]);
                        }
                    }
                }

                //assign empty image if there is no images for that food and drinks item
                for(var i = 0; i < this.foodAndDrinks.length; i++) {
                    if(this.foodAndDrinks[i].images[0] == null) {
                        var img : Image = {imageID: '', description: '', fileName: '', fileType: 'none', associatedItemID: '', base64Equiv: ''};
                        this.foodAndDrinks[i].images[0] = img;
                    }
                }
                console.log("Images have been assigned, food and drinks is now complete");
                console.log(this.foodAndDrinks);
            });
        }
    }

    private assignFoodAndDrinks() : void {
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
    }

    private checkLoad() : boolean {
        if(this.imagesLoaded && this.foodAndDrinksLoaded) {
           // this.completeLoading();
            return true;
        } else {
            return false;
        }
    }
 }