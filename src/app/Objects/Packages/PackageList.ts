import {Image} from '../Image'

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
    
    restaurants: string[];
    activities: string[];
    events: string[];

}