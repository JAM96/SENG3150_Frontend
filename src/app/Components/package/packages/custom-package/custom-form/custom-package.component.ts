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
    heightB : string = '0%';
    heightL : string = '0%';
    heightD : string = '0%';
    heightO : string = '0%';

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
        if(this.heightB == '0%') {
            this.heightB = '80%';
        } else {
            this.heightB = '0%';
        }
    }

    expandL(){
        if(this.heightL == '0%') {
            this.heightL = '80%';
        } else {
            this.heightL = '0%';
        }
    }

    expandD(){
        if(this.heightD == '0%') {
            this.heightD = '80%';
        } else {
            this.heightD = '0%';
        }
    }

    expandO() {
        if(this.heightO == '0%') {
            this.heightO = '80%';
        } else {
            this.heightO = '0%';
        }
    }
    // setTravelValue(selection : boolean) {
    //     this.travelValue = selection;
    // }
}