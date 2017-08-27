import {Room} from './Room';
import {Feature} from './Feature';
import {Image} from '../Image';

export class Accommodation {
    //Database attributes
    accommodationID             :   string;
    accommodationName           :   string;
    accommodationAddress        :   string;
    accommodationSuburb         :   string;
    latitude                    :   number;
    longitude                   :   number;
    accommodationStarRating     :   number;
    accommodationUserRating     :   number;
    bestSeller                  :   boolean
    accommodationType           :   string;
    websiteURL                  :   string;
    phoneNo                     :   string;
    totalSold                   :   number;
    totalViewed                 :   number;

    //Angular Attributes
    accommodationStars          :   number[] = [];
    accommodationRating         :   string; //'Okay', 'Good', 'Great', "Fabulous!"
    topFeatures                 :   Feature[]; //First 3 features for the list view.
    features                    :   Feature[]; //All features when user views the accommodation.
    room                        :   Room[];
    pricePerNight               :   number; //cheapest room price.
    selectedRoom                :   Room;   //selected room for the accommodation
    images                      :   Image[];

}

/*
  accommodationID CHAR(13) PRIMARY KEY NOT NULL,
  accommodationName VARCHAR(150) NOT NULL,
  accommodationAddress VARCHAR(200) NOT NULL,
  accommodationSuburb VARCHAR(100) NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  accommodationStarRating INT,
  accommodationUserRating DOUBLE,
  bestSeller INT NOT NULL,
  accommodationType VARCHAR(50) NOT NULL,
  pictureURL VARCHAR(300) NOT NULL,
  websiteURL VARCHAR(200),
  phoneNo VARCHAR(50) NOT NULL
*/