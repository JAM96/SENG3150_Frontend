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
    styles: [`agm-map {
                height: 300px;
                width: 400px;
            }`],
})

export class AccomodationComponent implements OnInit{
    accommodation : Accommodation;

    title: string = 'My first AGM project';
    //-32.9252731,151.7734869
    lat: number;
    lng: number;
    
     constructor(
        private accommodationService    :   IndividualAccommodationService,
        public dialogRef: MdDialogRef<AccomodationComponent>
        ) {}
    
    ngOnInit() {
        this.accommodation = Object.assign({}, this.accommodationService.getAccommodation());
        console.log("Accommodation is loaded: " + this.accommodation.accommodationName);

        this.lat = this.accommodation.latitude;
        this.lng = this.accommodation.longitude;
    }
}