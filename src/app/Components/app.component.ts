import { Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';

import {ImageService} from '../Services/image.service';
import {AccommodationService} from '../Services/Accommodation/accommodation.service';
import {ActivityService} from '../Services/Activity/activity.service';
import {FoodAndDrinksService} from '../Services/FoodAndDrinks/food-and-drinks.service';
import {TagService} from '../Services/fetch-tags.service'

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  private loadingMessage : string = "";
  private error : boolean = false;

  constructor(
    private auth : AuthService,
    private imageService : ImageService,
    private accommodationService: AccommodationService,
    private activityService : ActivityService,
    private foodAndDrinksService : FoodAndDrinksService,
    private tagService : TagService,
  ) {
    auth.handleAuthentication();
    this.fetchImages();
  }

  private fetchImages() : void {
    this.loadingMessage = "Loading (1/9): Images...";

    this.imageService.fetchImages()
      .subscribe(
        res => {
          this.imageService.setData(res);
          this.imageService.setLoaded(true);
          this.fetchAccommodation();
        },
        err => {
          console.log("Connection Failed: Could not retrieve images");
          this.loadingMessage = "Newcastle Connections cannot connect to the server at this current time, please try again at another time. If this problem persists, please contact a system administrator."
          this.error = true;
        }
      );
  }

  private fetchAccommodation() : void {
    this.loadingMessage = "Loading (2/9): Accommodation...";

    this.accommodationService.fetchAccommodation()
      .subscribe(
        res => {
          this.accommodationService.setAccommodation(res);

          //Get Accommodation features
          this.loadingMessage = "Loading (3/9): Accommodation Features...";
          this.accommodationService.fetchAccommodationFeatures()
            .subscribe(
              res => {
                this.accommodationService.setFeatures(res);
 
                //Get accommodation rooms
                this.loadingMessage = "Loading (4/9): Accommodation Rooms...";
                this.accommodationService.fetchAccommodationRooms()
                  .subscribe(
                    res => {
                      this.accommodationService.setRooms(res);
      
                      //Get accommodation room features
                      this.loadingMessage = "Loading (5/9): Accommodation Room Features...";
                      this.accommodationService.fetchAccommodationRoomFeatures()
                        .subscribe(
                          res => {
                            this.accommodationService.setRoomFeatures(res);
        
                            //assign features and rooms to the accommodation and initialise the accommodation
                            var temp = this.accommodationService.assign();
                            temp = this.accommodationService.assignImages(this.imageService.getData());

                            //set loaded
                            this.accommodationService.setAccommodationLoaded(true);

                            this.fetchFoodAndDrinks();
                          },
                          err => {
                            console.log("Connection Failed: Could not retrieve accommodation room features");
                            this.loadingMessage = "Newcastle Connections cannot connect to the server at this current time, please try again at another time. If this problem persists, please contact a system administrator."
                            this.error = true;
                          }
                        )
                    },
                    err => {
                      console.log("Connection Failed: Could not retrieve accommodation rooms");
                      this.loadingMessage = "Newcastle Connections cannot connect to the server at this current time, please try again at another time. If this problem persists, please contact a system administrator."
                      this.error = true;
                    }
                  )
              },
              err => {
                console.log("Connection Failed: Could not retrieve accommodation features");
                this.loadingMessage = "Newcastle Connections cannot connect to the server at this current time, please try again at another time. If this problem persists, please contact a system administrator."
                this.error = true;
              }
            );
        },
        err => {
          console.log("Connection Failed: Could not retrieve accommodation");
          this.loadingMessage = "Newcastle Connections cannot connect to the server at this current time, please try again at another time. If this problem persists, please contact a system administrator."
          this.error = true;
        }
      );
  }

  private fetchFoodAndDrinks() : void {

    this.foodAndDrinksService.fetchFoodAndDrinks()
      .subscribe(
        res => {
          this.foodAndDrinksService.setFoodAndDrinks(res);

          //get tags
          this.loadingMessage = "Loading (7/9): Food and Drink Tags...";
          this.tagService.fetchTags()
            .subscribe(
              res => {
                this.foodAndDrinksService.setTags(res);
   
                //get booking times
                this.loadingMessage = "Loading (8/9): Food and Drink Booking Times...";
                this.foodAndDrinksService.fetchFoodAndDrinksTime()
                  .subscribe(
                    res => {
                      this.foodAndDrinksService.setBookingTimes(res);
          
                      //assign times and tags to the food and drinks
                      var temp = this.foodAndDrinksService.assign();
                      temp = this.foodAndDrinksService.assignImages(this.imageService.getData());

                      //set loaded
                      this.foodAndDrinksService.setLoaded(true);
                      this.fetchActivities();
                    },
                    err => {
                      console.log("Connection Failed: Could not retrieve booking times");
                      this.loadingMessage = "Newcastle Connections cannot connect to the server at this current time, please try again at another time. If this problem persists, please contact a system administrator."
                      this.error = true;
                    }
                  );
              }, 
              err => {
                console.log("Connection Failed: Could not retrieve tags");
                this.loadingMessage = "Newcastle Connections cannot connect to the server at this current time, please try again at another time. If this problem persists, please contact a system administrator."
                this.error = true;
              }
            );
        },
        err => {
          console.log("Connection Failed: Could not retrieve food and drinks");
          this.loadingMessage = "Newcastle Connections cannot connect to the server at this current time, please try again at another time. If this problem persists, please contact a system administrator."
          this.error = true;
        }
      );
  }

  private fetchActivities() : void {
    this.loadingMessage = "Loading (9/9): Activities...";

    this.activityService.fetchActivities()
      .subscribe(
        res => {
          this.activityService.setData(res);
          //assign images
          var temp = this.activityService.assignImages(this.imageService.getData());
          //set loaded
          this.activityService.setLoaded(true);
        },
        err => {
          console.log("Connection Failed: Could not retrieve activities");
          this.loadingMessage = "Newcastle Connections cannot connect to the server at this current time, please try again at another time. If this problem persists, please contact a system administrator."
          this.error = true;
        }
      );
  }

  private checkLoaded() : boolean {
    if(this.imageService.isLoaded() 
      && this.accommodationService.isAccommodationLoaded()
      && this.foodAndDrinksService.isLoaded()
      && this.activityService.isLoaded()) {
        return true;
      } else {
        return false;
      }
  }
}