import {Component, Input, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

//import objects
import {Accommodation} from '../../../Objects/Accommodation/Accommodation';

//import services
import {IndividualAccommodationService} from '../../../Services/Accommodation/individual-accommodation.service';

@Component({
    moduleId: module.id,
    selector: 'accomodation-list',
    templateUrl: 'accommodationListView.component.html',
})

export class AccommodationListComponent { }