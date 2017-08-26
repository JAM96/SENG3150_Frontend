import {TravelInformation} from './TravelInformation';

import {Accommodation} from '../../Accommodation/Accommodation';
import {FoodAndDrinks} from '../../FoodAndDrinks/FoodAndDrinks';
import {Activity} from '../../Activity/Activity';

export class CustomPackage {
    packageID       : string;

    //Navigation Options
    navigation      : number;   //Menu option selected.
    requireTravel   : string;   //If travel form is visible or not
    fSelectedDay    : number;   //Food and Drinks selected day
    aSelectedDay    : number;   //Activities Selected day

    //Customer Information
    budget  : number;           //store the selected budget
    guests  : number;           //store how many guests are going on the holiday
    rooms   : number;           //store how many rooms the user wants
    checkin : Date;             //date when arriving
    checkout: Date;             //date when departing
    packageCost     : number;   //cost of the package 

    //Travel Information
    travel  : TravelInformation[];  //pickup and dropoff information

    //Accommodation
    accommodation   : Accommodation;    //selected accommodation
    previousSelectedAccommodation : number; //previously selected accommodation price

    //food and drink options
    foodAndDrinks   : FoodAndDrinks[];  //selected food and drink items
    selectedFoodAndDrinks   : string[]; //this is to easily check if the item has been added or not

    //activities 
    activity        : Activity[];   //selected activities
    selectedActivities  : string[];
}