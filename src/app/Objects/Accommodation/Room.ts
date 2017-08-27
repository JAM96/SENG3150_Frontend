import {Feature} from './Feature';
import {Image} from '../Image';

export interface Room {
    accommodationID     : string;
    roomID              : string;
    roomTitle           : string;
    roomPrice           : number;
    numPeople           : number;
    numBeds             : number;

    features            : Feature[];
    images              : Image[];
}