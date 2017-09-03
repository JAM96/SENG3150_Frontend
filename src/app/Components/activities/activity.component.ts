import {Component, Input, Output, EventEmitter} from '@angular/core';

import { Md2Dialog } from 'md2';

//import objects
import {Activity} from '../../Objects/Activity/Activity';
import {DataService} from '../../Services/data.service';
import {CustomPackageService} from '../../Services/Package/custom-package.service';

@Component({
    moduleId: module.id,
    selector: 'activity',
    templateUrl: 'activity.component.html',
    styles: [],
})

export class ActivityComponent {
    @Input() private activity : Activity;
    @Input() private view : number;
    @Input() private selectedDay : number;
    @Input() private selectedActivities : string[];
    
    @Output() private selected = new EventEmitter<Activity>();

    constructor(private data : DataService,
        private packageService : CustomPackageService,
    ) {}

    /**
     * opens the dialog
     * @param dialog 
     */
    private viewItem(dialog : Md2Dialog) : void {
        dialog.open();
    }

    private setActivity(dialog : Md2Dialog) : void {
        dialog.open();
    }

    private close(dialog : any) {
        dialog.close();
    }

    private checkActivity() : boolean {
        for(var i = 0; i < this.selectedActivities.length; i++)
            if(this.activity.activityID + this.selectedDay == this.selectedActivities[i]) 
                return false;
        return true;
    }

    private addActivity(time : Date) : void {
        this.activity.selectedDay = this.selectedDay;
        this.activity.selectedTime = '' + time.getHours() + ':' + time.getMinutes();
        
        this.packageService.setActivity(this.activity, this.activity.activityID+this.selectedDay);
        

        this.packageService.setPackageCost(
            this.packageService.getPackageCost() + this.activity.price, null)
    }

    private removeActivity() : void {
        this.packageService.removeActivity(this.activity, this.selectedDay);
    }
}