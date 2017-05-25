import {Component, Input, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'custom-package',
    templateUrl: 'custom-package.component.html',
})
export class CustomPackageComponent implements OnInit{
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