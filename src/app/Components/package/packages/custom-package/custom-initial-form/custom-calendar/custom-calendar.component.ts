import {Component} from '@angular/core'
import {ROW_STYLE} from './custom-calendar.style'

@Component({
    moduleId: module.id,
    selector: 'custom-calendar',
    templateUrl: 'custom-calendar.component.html',
    styleUrls: [ROW_STYLE]
})

export class CustomCalendarComponent {
    private selected : number = 0;
    
    calendar  : any[][] = [
        //Su    Mo    Tu    We    Th    Fr    Sa
        ['250617', '260617', '270617', '280617', '290617', '300617', '010717'],
        ['020717', '030717', '040717', '050717', '060717', '070717', '080717'],
        ['090717', '100717', '110717', '120717', '130717', '140717', '150717'],
        ['160717', '170717', '180717', '190717', '200717', '210717', '220717'],
        ['230717', '240717', '250717', '260717', '270717', '280717', '290717'],
        ['300717', '310717', '010817', '020817', '030817', '040817', '050817']
    ];  //The calendar array contains the days for easy implementation in the html
    
    
    month : string = "July";
    selectedDay : number = 260717;  //day that is selected.
    currentDay  : number = 280717;  //current day

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