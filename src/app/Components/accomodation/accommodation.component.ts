import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Md2Dialog } from 'md2';

//import objects
import {Accommodation} from '../../Objects/Accommodation/Accommodation';
import {Room} from '../../Objects/Accommodation/Room'

//Custom Package Service
import {CustomPackageService} from '../../Services/Package/custom-package.service';

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

    private selectOption(room : Room) : void {
        this.packageService.setAccommodation(
            this.accommodation,
            room,
        );
        

        var price = room.roomPrice;
        console.log("room price is: " + price)
        var packageCost = this.packageService.getPackageCost() + price * this.duration;

        this.packageService.setPackageCost(packageCost, price * this.duration);
        
        console.info('[INFO] Added ', this.accommodation, ' to cart.');
    }

    private close(dialog: any) {
        dialog.close();
    }
 }