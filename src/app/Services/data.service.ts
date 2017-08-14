/**
 * SERVICE NAME: Data
 * Role: Main purpose of this service will be setting the api location once and allowing multiple services access that url
 * Created by: Jack Mennie
 * Date: 14/08/17
 */
import { Injectable } from '@angular/core';

@Injectable() 
export class DataService {
  apiUrl: string = 'http://localhost:8080'; //Api Location

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
      case 'activity': 
        url = url + '/fetchActivities';
        break;
      case 'food-and-drinks': 
        url = url + '/fetchFoodAndDrinks';
        break;
      case 'packages': break;
    }

    console.log(url);
    return url;
  }
}