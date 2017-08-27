import {Component} from '@angular/core';

//import objects
import {Accommodation} from '../../Objects/Accommodation/Accommodation';

//import services
import {AccommodationService} from '../../Services/Accommodation/accommodation.service';
import {DataService} from '../../Services/data.service';

@Component({
    moduleId: module.id,
    selector: 'accomodation-list',
    templateUrl: 'accommodationListView.component.html',
})

export class AccommodationListComponent {
    constructor(public data : DataService) {
        data.setNavigation(6);
    }
 }