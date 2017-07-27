import {Component} from '@angular/core'

@Component({
    moduleId: module.id,
    selector: 'custom-calendar',
    templateUrl: 'custom-calendar.component.html',
})

export class CustomCalendarComponent {
    private selected : number = 0;
    
    days : string[] = ['25','26','27','28','29','30','01','02','03','04','05','06','07','08','09','10',
            '11','12','13','14','15','16','17','18','19','20','21','22','23',
            '24','25','26','27','28','29','30','31','01','02','03','04','05']
}