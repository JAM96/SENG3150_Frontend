/**
 * SERVICE NAME: Data
 * Role: Main purpose of this service will be setting the api location once and allowing multiple services access that url
 * Created by: Jack Mennie
 * Date: 14/08/17
 */
import { Injectable } from '@angular/core';

@Injectable() 
export class DataService {
  private navigationSelection : number = 1;

  //###############################################################
  
  private apiUrl: string = 'http://10.0.0.7:8080'; //Api Location

  //###############################################################
  
  //Passes in the service name and returns the full url
  getApiUrl(service : String) {
    var url = this.apiUrl;

    //Append the struts action method
    switch(service) {
      case 'accommodation': 
        url = url + '/fetchAccommodation'; 
        break;
      case 'accommodationFeatures':
        url = url + '/fetchAccommodationFeatures';
        break;
      case 'accommodationRooms':
        url = url + '/fetchAccommodationRooms';
        break;
      case 'accommodationRoomFeatures':
        url = url + '/fetchRoomFeatures';
        break;
      case 'activity': 
        url = url + '/fetchActivities';
        break;
      case 'food-and-drinks': 
        url = url + '/fetchFoodAndDrinks';
        break;
      case 'food-and-drinks-times': 
        url = url + '/fetchBookingTimes';
        break;
      case 'tags':
        url = url + '/fetchTags'
      case 'images':
        url = url + '/fetchImages';
        break;
      case 'packages': 
        url = url + '/fetchPremadePackages';
        break;
      case 'packagesitems':
        url = url + '/fetchPremadePackageItems';
        break;
      case 'image':
        url = url + '/fetchImage?imageId=';
        break;
    }
    
    return url;
  }

  public setNavigation(selection : number) : void {
    this.navigationSelection = selection;
  }

  public getNavigation() : number {
    return this.navigationSelection;
  }
}