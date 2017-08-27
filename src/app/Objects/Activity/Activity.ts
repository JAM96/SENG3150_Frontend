import {Image} from '../Image';
import {BookingTime} from '../BookingTime';

export interface Activity {
    //database attributes
    activityID          :   string;
    name                :   string;
    category            :   string;
    activityType        :   string;
    address             :   string;
    suburb              :   string;
    briefDescription    :   string;
    websiteURL          :   string;
    phoneNo             :   string;
    price               :   number;
    limitedTimeOnly     :   boolean;
    startDate           :   Date;
    endDate             :   Date;
    bestSeller          :   boolean;
    latitude            :   number;
    longitude           :   number;
    totalSold           :   number;
    totalViewed         :   number;

    //angular attributes
    selectedDay         :   number;
    selectedTime        :   string;
    images              :   Image[];
    bookingTimes        :   BookingTime[];
}