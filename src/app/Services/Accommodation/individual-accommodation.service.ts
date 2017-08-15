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

    constructor() {
        console.log("I AM IN THE INDI ACCOMMODATION SERVICE");
    }

    setAccommodation(acc : Accommodation) {
        var data = new Accommodation;
        console.log("Imported accommodation is: ")
        console.log(acc)
        data = acc;

        this.accommodation = data;
        console.log("Accommodation has been set: " );
        console.log(this.accommodation)
    }

    getAccommodation() : Accommodation {
        console.log("Returning accommodation object");
        console.log(this.accommodation);
        return this.accommodation;
    };
}