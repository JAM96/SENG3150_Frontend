import {Component, Input, OnInit} from '@angular/core';

//import objects
import {Accommodation} from '../../Objects/Accommodation/Accommodation';

//import services
import {AccommodationService} from '../../Services/Accommodation/accommodation.service';

@Component({
    moduleId: module.id,
    selector: 'accomodation',
    // templateUrl: 'accomodation.component.html',
    templateUrl: 'accomodationListView/accomodationListView.html',
    providers: [AccommodationService]
})

export class AccomodationComponent{
    accommodation : Accommodation[];
    
     constructor(
        private accommodationService    :   AccommodationService
        ) {}
    
    getAccommodation() {
        this.accommodationService.getMockAccommodation()
        .then((accommodation: Accommodation[]) => this.accommodation = accommodation);
    }
}