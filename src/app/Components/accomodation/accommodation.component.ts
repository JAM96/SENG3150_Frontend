/*
    Name : Accommodaiton Component
    This component is in charge of displaying and handling an individual accommodation component
    the accommodation data is passed in from the parent component which may be from the custom package or the accommodaiton view component

    Inputs:
        accommodation : all the individual component data
        selectedAccommodation: the id of the currently selected accommodation
        view: the type of view in which to display the item
        duration: how long the package is lasting for
*/

import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Md2Dialog } from 'md2';

//import objects
import {Accommodation} from '../../Objects/Accommodation/Accommodation';
import {Room} from '../../Objects/Accommodation/Room'

//Custom Package Service
import {CustomPackageService} from '../../Services/Package/custom-package.service';
import {DataService} from '../../Services/data.service';

@Component({
    moduleId: module.id,
    selector: 'accommodation',
    templateUrl: 'accommodation.component.html',
    styles: [`agm-map {
        height: 300px;
        width: 100%;
    }`],
})

export class AccommodationComponent {
    //import values from parent component
    @Input() private accommodation : Accommodation;
    @Input() private selectedAccommodation : string;
    @Input() private view : number;
    @Input() private duration : number;

    //dialog navigation
    private dialogSelection : number = 1; // 1 = Description, 2 = rooms


    constructor(
        private data : DataService,
        private packageService : CustomPackageService,
    ) {}

    /**
     * Opens the selected dialog
     * @param dialog 
     */
    private open(dialog : Md2Dialog) : void {
        dialog.open();  
    }

    /**
     * Sets the dialog selection value and update the dialog view
     * @param value 
     */
    private setDialogNavigation(value : number) : void{
        this.dialogSelection = value;
    }

    /**
     * this sets the room option and adds it to the custom package
     * @param room 
     */
    private selectOption(room : Room) : void {
        this.packageService.setAccommodation(
            this.accommodation,
            room,
        );
    
        var price = room.roomPrice;
        var packageCost = this.packageService.getPackageCost() + price * this.duration;

        //update the package cost
        this.packageService.setPackageCost(packageCost, price * this.duration);
    }

    private close(dialog: any) {
        dialog.close();
    }
 }