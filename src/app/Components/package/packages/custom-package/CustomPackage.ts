import {FoodAndDrinksForm} from './custom-form/objects/FoodAndDrinksForm';
import {TravelInformation} from './custom-form/objects/TravelInformation';
import {ActivityForm} from './custom-form/objects/ActivityForm';
import {Accommodation} from '../../../../Objects/Accommodation/Accommodation';

export class CustomPackage {
    //Navigation Options
    navigation      : number;   //Menu option selected.
    requireTravel   : string;   //If travel form is visible or not
    fSelectedDay    : number;   //Food and Drinks selected day
    aSelectedDay    : number;   //Activities Selected day

    //Customer Information
    budget  : number;
    guests  : number;
    rooms   : number;
    checkin : Date;
    checkout: Date;
    packageCost     : number;

    //Travel Information
    travel  : TravelInformation[];

    //Accommodation
    accommodation   : Accommodation;
    previousSelectedAccommodation : number;

    //food and drink options
    foodAndDrinks   : FoodAndDrinksForm[];

    //activities 
    activity        : ActivityForm[];
}