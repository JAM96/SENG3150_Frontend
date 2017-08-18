import {Feature} from './Feature';

export interface Room {
    accommodationID     : string;
    roomID              : string;
    roomTitle           : string;
    roomPrice           : number;
    numPeople           : number;
    numBeds             : number;
    features            : Feature[];
}