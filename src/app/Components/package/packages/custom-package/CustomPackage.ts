export class CustomPackage {
    //Navigation Options
    navigation      : number = 1;   //Menu option selected.
    requireTravel   : string = 'No' //If travel form is visible or not
    fSelectedDay    : number = 1;   //Food and Drinks selected day
    aSelectedDay    : number = 1;   //Activities Selected day
    
    //Customer Information
    budget  : any       = 472;
    guests  : number    = 1;
    rooms   : number    = 1;
    checkin : Date;
    checkout: Date;

    //Travel Information
    travelPickup    : {
        address: string, 
        city: string, 
        state: string, 
        postcode: number,
        date: Date;
        time: string;
    };
    travelDropoff   : {
        address: string, 
        city: string, 
        state: string, 
        postcode: number,
        date: Date;
        time: string;
    };

    //Accommodation
    accommodation   : string;

    //food and drink options
    foodBreakfast   : object[]; //format in day, venue, time
    foodLunch       : object[];
    foodDinner      : object[];
    foodOther       : object[];

    //activities 
    activity        : string[][] // [n days][n activites] 
}