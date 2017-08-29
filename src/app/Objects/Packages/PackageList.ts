import {Image} from '../Image';
import {PackageItems} from './PackageItems';
import {FoodAndDrinks} from '../FoodAndDrinks/FoodAndDrinks';
import {Activity} from '../Activity/Activity';
import {Accommodation} from '../Accommodation/Accommodation';

export interface PackageList {
    premadePackageID            :   string;
    packageName                 :   string;
    totalCost                   :   number;
    accommodationID             :   string;
    numDays                     :   number;
    startAvailabilityDate       :   string;
    endAvailabilityDate         :   string;
    totalSold                   :   number;
    totalViewed                 :   number;


    //Other attributes
    images                      :   Image[];
    
    restaurants                 :   FoodAndDrinks[];
    activities                  :   Activity[];
    accommodation               :   Accommodation;

}