export class CustomPackage {
    budget  : any       = 472;
    guests  : number    = 1;
    rooms   : number    = 1;
    checkin : Date;
    checkout: Date;

    hotel   : string;
    

    //food items
    foodBreakfast   : object[]; //format in day, venue, time
    foodLunch       : object[];
    foodDinner      : object[];
    foodOther       : object[];

    //activities 
    activity        : string[][] // [n days][n activites] 
}