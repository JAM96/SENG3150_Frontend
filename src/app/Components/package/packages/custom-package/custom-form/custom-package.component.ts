import {Component, Input, OnInit} from '@angular/core';

//import objects
import {Hotel} from '../../../../../Objects/Hotel/Hotel';

//import services
import {HotelService} from '../../../../../Services/hotel/hotel.service';


@Component({
    moduleId: module.id,
    selector: 'custom-package',
    templateUrl: 'custom-package.component.html',
    providers: [HotelService]
})
export class CustomPackageComponent implements OnInit{
    //Objects
    hotels : Hotel[];
    //
    selected : number = 3;
    days : number[] = [1,2,3,4,5];
    selectedDay : number = 3;

    //travel form
    travelSubmitted : boolean = false;
    travelValue : string = 'No';
    travelOptions = ['Yes','No'];

    //travel form
    accommodationValue : string = 'No';
    accommodationOptions = ['Yes', 'No'];


    //food form
    displayB : string = 'none';
    displayL : string = 'none';
    displayD : string = 'none';
    displayO : string = 'none';

    constructor(private hotelService : HotelService) {}

    ngOnInit() {
    }

    getHotels() {
        console.log('retrieving hotels');
        //this.hotelService.getMockHotels().then((hotels: Hotel[]) => this.hotels = hotels);
        this.hotelService.getHotels()
            .subscribe(
                hotel => this.hotels = hotel
                , err => {console.log(err);})
    }

    //Navigation
    prevForm() {
        if(this.selected != 1) {
            this.setNavigation(this.selected - 1);
            console.info(this.selected);
        }
    }

    nextForm() {
        if(this.selected != 5) {
            this.setNavigation(this.selected + 1);
            console.info(this.selected);
        }
    }

    setNavigation(selection : number) {
        this.selected = selection;

        switch(selection) {
            case 1:
            case 2: this.getHotels();
            case 3:
            case 4:
            case 5:
        }
    }

    setDays(selection : number) {
        this.selectedDay = selection;
    }

    expandB(){
        if(this.displayB == 'none') {
            this.displayB = 'block';
        } else {
            this.displayB = 'none';
        }
    }

    expandL(){
        if(this.displayL == 'none') {
            this.displayL = 'block';
        } else {
            this.displayL = 'none';
        }
    }

    expandD(){
        if(this.displayD == 'none') {
            this.displayD = 'block';
        } else {
            this.displayD = 'none';
        }
    }

    expandO() {
        if(this.displayO == 'none') {
            this.displayO = 'block';
        } else {
            this.displayO = 'none';
        }
    }
    // setTravelValue(selection : boolean) {
    //     this.travelValue = selection;
    // }
}