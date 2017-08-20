export interface Activity {
    activityID          :   string;
    name                :   string;
    category            :   string;
    //Later on, we should include this variable:
    // activityType        :   string;
    address             :   string;
    suburb              :   string;
    mainPhotoURL        :   string;
    briefDescription    :   string;
    websiteURL          :   string;
    phoneNo             :   string;
    price               :   number;
    limitedTimeOnly     :   boolean;
    startDate           :   Date;
    endDate             :   Date;
    bestSeller          :   boolean;

    selectedDay         :   number;
    selectedTime        :   string;
}