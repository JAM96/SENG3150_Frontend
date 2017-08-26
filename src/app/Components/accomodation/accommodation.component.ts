import {Component, Input, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

//import objects
import {Accommodation} from '../../Objects/Accommodation/Accommodation';

//import services
import {IndividualAccommodationService} from '../../Services/Accommodation/individual-accommodation.service';

@Component({
    moduleId: module.id,
    selector: 'accomodation',
    templateUrl: 'accommodation.component.html',
    styles: [`agm-map {
                height: 300px;
                width: 400px;
            }`],
})

export class AccommodationComponent implements OnInit{
    selected : number = 1;
    accommodation : Accommodation;

    
    //-32.9252731,151.7734869
    lat: number;
    lng: number;
    
     constructor(
        private accommodationService    :   IndividualAccommodationService,
        public dialogRef: MdDialogRef<AccommodationComponent>
        ) {}
    
    ngOnInit() {
        this.accommodation = Object.assign({}, this.accommodationService.getAccommodation());
        console.log("Accommodation is loaded: " + this.accommodation.accommodationName);

        this.lat = this.accommodation.latitude;
        this.lng = this.accommodation.longitude;
    }

    setNavigation(selection : number) : void {
        this.selected = selection;
    }
}