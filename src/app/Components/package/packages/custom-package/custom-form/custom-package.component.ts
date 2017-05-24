import {Component, Input, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'custom-package',
    templateUrl: 'custom-package.component.html',
})
export class CustomPackageComponent implements OnInit{
    selected : number = 1;

    //travel form
    travelSubmitted : boolean = false;
    travelValue : string = 'No';
    travelOptions = ['Yes','No'];

    //travel form
    accommodationValue : string = 'No';
    accommodationOptions = ['Yes', 'No'];

    ngOnInit() {
        
    }

    //Navigation
    prevForm() {
        if(this.selected != 1) {
            this.selected = this.selected - 1;
            console.info(this.selected);
        }
    }

    nextForm() {
        if(this.selected != 5) {
            this.selected = this.selected + 1;
            console.info(this.selected);
        }
    }

    setNavigation(selection : number) {
        this.selected = selection;
    }

    // setTravelValue(selection : boolean) {
    //     this.travelValue = selection;
    // }
}