import {Component, Input, OnInit} from '@angular/core';

//import objects
import {Hotel} from '../../Objects/Hotel/Hotel';

//import services
import {HotelService} from '../../Services/hotel/hotel.service';

@Component({
    moduleId: module.id,
    selector: 'accomodation',
    // templateUrl: 'accomodation.component.html',
    templateUrl: 'accomodationListView/accomodationListView.html',
    providers: [HotelService]
})

export class AccomodationComponent{
    hotels : Hotel[];
     constructor(
        private hotelService    :   HotelService
        ) {}
    getHotels() {
        
        this.hotelService.getMockHotels().then((hotels: Hotel[]) => this.hotels = hotels);
    }
}