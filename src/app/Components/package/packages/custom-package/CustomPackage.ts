export class CustomPackage {
    budget  : any       = 472;
    guests  : number    = 1;
    rooms   : number    = 1;
    checkin : Date;
    checkout: Date;

    hotel   : string;
    

    //food items
    foodBreakfast   : string[];
    foodLunch       : string[];
    foodDinner      : string[];
    foodOther       : string[];

    //activities 
    activity        : string[][] // [n days][n activites] 
}