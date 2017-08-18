import {FoodAndDrinksForm} from './custom-form/objects/FoodAndDrinksForm';
import {TravelInformation} from './custom-form/objects/TravelInformation';
import {ActivityForm} from './custom-form/objects/ActivityForm';
import {Accommodation} from '../../../../Objects/Accommodation/Accommodation';

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
    foodAndDrinks   : FoodAndDrinksForm[];  //selected food and drink items

    //activities 
    activity        : ActivityForm[];   //selected activities
}