export interface TravelInformation {
    pickup      : boolean   //true = pickup, false = dropoff
    address     : string, 
    city        : string, 
    state       : string, 
    postcode    : number,
    date        : Date;
    time        : string;
}