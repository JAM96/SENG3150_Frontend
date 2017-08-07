import {Component} from '@angular/core'
import {ROW_STYLE} from './custom-calendar.style'

@Component({
    moduleId: module.id,
    selector: 'custom-calendar',
    templateUrl: 'custom-calendar.component.html',
    styleUrls: [ROW_STYLE]
})

export class CustomCalendarComponent {
    private _locale : any = "en-US";

    private selected : number = 0;
    
    calendar  : string[][] = [
        //Su    Mo    Tu    We    Th    Fr    Sa
        ['250617', '260617', '270617', '280617', '290617', '300617', '010717'], // Week 1, will contains previous month days
        ['020717', '030717', '040717', '050717', '060717', '070717', '080717'], // Week 2
        ['090717', '100717', '110717', '120717', '130717', '140717', '150717'], // Week 3
        ['160717', '170717', '180717', '190717', '200717', '210717', '220717'], // Week 4
        ['230717', '240717', '250717', '260717', '270717', '280717', '290717'], // Week 5
        ['300717', '310717', '010817', '020817', '030817', '040817', '050817']  // Week 6, will contain next month days
    ];  //The calendar array contains the days for easy implementation in the html
    
    
    month : string = "July";
    year : number = 2017;
    selectedDay : string = '260717';  //day that is selected.
    currentDay  : string = '280717';  //current day

    someDay = new Date('09/21/17');

    constructor() {
        this.fillCalendarDays(new Date());
    }

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
    setDay(value : string) {
        var month = this.extractMiddle(value);

        switch(month) {
            case '01': month = "January"; break;
            case '02': month = "February"; break;
            case '03': month = "March"; break;
            case '04': month = "April"; break;
            case '05': month = "May"; break;
            case '06': month = "June"; break;
            case '07': month = "July"; break;
            case '08': month = "August"; break;
            case '09': month = "September"; break;
            case '10': month = "October"; break;
            case '11': month = "November"; break;
            case '12': month = "December"; break;
        }
        console.log(month);

        if(month != this.month) {
            this.month = month;
        }
        

        this.selectedDay = value;
    }

    extractMiddle(str : string) {

        var position;
        var length;

        if(str.length % 2 == 1) {
            position = str.length / 2;
            length = 1;
        } else {
            position = str.length / 2 - 1;
            length = 2;
        }

        return str.substring(position, position + length)
    }


    /*
        the fill calendar days function will get the selected date and find out the day that corresponds with it
        e.g. 03/08/17 is a thursday
        It will then iterate through a list to ensure that the date '03' is closet to the 42 day array value
        which will be in the calendarDays[1][X] row where X is to be determined
    */
    fillCalendarDays(value : Date) {
        var day = this.getDayName(value, this._locale); //get the day from the date, e.g. 'Sunday'

        switch(day) {
            //the switch will then call another function which will populate an array with the neccesary days
            case 'Sunday': 
                console.log('value is sunday');
                this.insertIntoArray([0,7,14,21,28,35], value);    //sunday days occur on the following array inserts
                break;
            case 'Monday': 
                console.log('value is mon');
                this.insertIntoArray([1,8,15,22,29,36], value);
                break;
            case 'Tuesday': 
                console.log('value is tues');
                this.insertIntoArray([2,9,16,23,30,37], value);
                break;
            case 'Wednesday': 
                console.log('value is wed');
                this.insertIntoArray([3,10,17,24,31,38], value);
                break;
            case 'Thursday': 
                console.log('value is thur');
                this.insertIntoArray([4,11,18,25,32,39], value);
                break;
            case 'Friday': 
                console.log('value is fri');
                this.insertIntoArray([5,12,19,26,33,40], value);
                break;
            case 'Saturday': 
                console.log('value is sat');
                this.insertIntoArray([6,13,20,27,34,41], value);
                break;
        }
    }

    insertIntoArray(dayValues : Number[], dateInsert : Date) {
        var date = dateInsert.getDay();
        var index; //index at where to begin the for loops to fill calendar days
        if(date > 0 && date < 7) {
            //append to row 0
            index = dayValues[0];
        }

        else if(date >= 7 && date < 14) {
            //append to row 1
            index = dayValues[1];
        }

        else if (date >= 14 && date < 21) {
            //append to row 2
            index = dayValues[2];
        }

        else if (date >= 21 && date < 28) {
            //append to row 3
            index = dayValues[3];
        }
        
        else if (date >= 28) {
            //append to row 4
            index = dayValues[4];
        }
    }

    getDayName(date : Date, locale : any) {
        return date.toLocaleDateString(locale, {weekday: 'long'});
    }
}