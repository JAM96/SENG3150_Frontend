import {Component} from '@angular/core'

@Component({
    moduleId: module.id,
    selector: 'custom-calendar',
    templateUrl: 'custom-calendar.component.html',
    styleUrls: ['custom-calendar.component.css']
})

export class CustomCalendarComponent {
    private selected : number = 0;
    
    days : string[] = ['25','26','27','28','29','30','01','02','03','04','05','06','07','08','09','10',
            '11','12','13','14','15','16','17','18','19','20','21','22','23',
            '24','25','26','27','28','29','30','31','01','02','03','04','05'];

    month : string = "July";
    selectedDay : number = 26;  //day that is selected.
    currentDay  : number = 28;  //current day

    calendarday = 'normal';


    openMonth() {
        this.selected = 1;
    }

    openYear() {
        this.selected = 2;
    }

    close() {
        this.selected = 0;
    }

    /* sets the month value of the date */
    updateMonth(value : number) {
        switch(value) {
            case 0: this.month = "January"; break;
            case 1: this.month = "February"; break;
            case 2: this.month = "March"; break;
            case 3: this.month = "April"; break;
            case 4: this.month = "May"; break;
            case 5: this.month = "June"; break;
            case 6: this.month = "July"; break;
            case 7: this.month = "August"; break;
            case 8: this.month = "September"; break;
            case 9: this.month = "October"; break;
            case 10: this.month = "November"; break;
            case 11: this.month = "December"; break;
        }
        this.selected = 0;
    }

    /* updates the selected day */
    setDay(value : number) {
        this.selectedDay = value;
    }
}