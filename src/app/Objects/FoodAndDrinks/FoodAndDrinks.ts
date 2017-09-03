import {Image} from '../Image';
import {Tag} from '../Tag';
import {BookingTime} from '../BookingTime'

export interface FoodAndDrinks {
    //Database Object
    foodAndDrinksID     :   string;
    name                :   string;
    starRating          :   number;
    address             :   string;
    suburb              :   string;
    menuTheme           :   string;
    websiteURL          :   string;
    briefDescription    :   string;
    expenseRating       :   number;     //Lower number = cheaper restauarant
    diningStyle         :   string;
    phoneNo             :   string;
    userRating          :   number;
    bestSeller          :   boolean;
    latitude            :   number;
    longitude           :   number;
    totalSold           :   number;
    totalViewed         :   number;
   
    //Angular Attributes
    stars               :   number[];
    expense             :   number[];   //How many '$' to show
    
    selectedTime        :   BookingTime;
    selectedDay         :   number;

    rating              :   string; //'Okay', 'Good', 'Great', "Fabulous!"
    images              :   Image[];
    menuType            :   Tag[]; //e.g. ['Breakfast'], ['Breakfast','Dinner']
    timeAvailable       :   BookingTime[];
}