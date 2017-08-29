import {Component, Input, Output, EventEmitter} from '@angular/core';

import { Md2Dialog } from 'md2';

//import objects
import {Activity} from '../../Objects/Activity/Activity';


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

    constructor() {}

    /**
     * opens the dialog
     * @param dialog 
     */
    private viewItem(dialog : Md2Dialog) {
        dialog.open();
    }

    /**
     * Outputs the selected activity
     * @param activity 
     */
    private addActivity() : void {
        this.selected.emit(this.activity);
    }

     checkActivity() : boolean {
        for(var i = 0; i < this.selectedActivities.length; i++)
            if(this.activity.activityID + this.selectedDay == this.selectedActivities[i]) 
                return false;
        return true;
    }
}