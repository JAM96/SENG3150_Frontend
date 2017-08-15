import {Component, Input, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

//import objects
import {Accommodation} from '../../Objects/Accommodation/Accommodation';

//import services
import {IndividualAccommodationService} from '../../Services/Accommodation/individual-accommodation.service';

@Component({
    moduleId: module.id,
    selector: 'accomodation',
    // templateUrl: 'accomodation.component.html',
    templateUrl: 'accomodation.component.html',
})

export class AccomodationComponent implements OnInit{
    accommodation : Accommodation;
    
     constructor(
        private accommodationService    :   IndividualAccommodationService,
        public dialogRef: MdDialogRef<AccomodationComponent>
        ) {}
    
    ngOnInit() {
        this.accommodation = Object.assign({}, this.accommodationService.getAccommodation());
        console.log("Accommodation is loaded: " + this.accommodation.accommodationName);
    }
}