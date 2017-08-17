/*
 * SERVICE NAME: Accommodation
 * Role: Storing and sending one accommodation through components
 * Created By: Jack Mennie
 * Date Completed: 14/08/17 
 */

//Imports
    import {Injectable} from '@angular/core';
    import {Accommodation} from '../../Objects/Accommodation/Accommodation';
//end imports

@Injectable()
export class IndividualAccommodationService {
    accommodation : Accommodation;

    constructor() {}

    setAccommodation(acc : Accommodation) {
        this.accommodation = acc;
    }

    getAccommodation() : Accommodation {
        return this.accommodation;
    };
}