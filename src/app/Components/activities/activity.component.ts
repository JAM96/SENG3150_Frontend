import {Component, Input, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

//import objects
import {Activity} from '../../Objects/Activity/Activity';

//import services
import {IndividualActivityService} from '../../Services/Activity/individual-activity.service';

@Component({
    moduleId: module.id,
    selector: 'activity',
    templateUrl: 'activity.component.html',
    styles: [],
})

export class ActivityComponent implements OnInit{
    Activity : Activity;
    
     constructor(
        private ActivityService    :   IndividualActivityService,
        public dialogRef: MdDialogRef<ActivityComponent>
        ) {}
    
    ngOnInit() {
        this.Activity = Object.assign({}, this.ActivityService.getActivity());
        console.log("Activity is loaded: " + this.Activity.name);
    }
}