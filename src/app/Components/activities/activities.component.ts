import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route } from '@angular/router';
import {Activity} from '../../Objects/Activity/Activity';
import {ActivityService} from '../../Services/Activity/activity.service';

@Component({
    moduleId: module.id,
    selector: 'activities',
    templateUrl: 'activities.component.html',
    providers: [ActivityService]
})

export class ActivitiesComponent implements OnInit{   
    constructor(private activityService : ActivityService){}

    ngOnInit() {
        this.getActivities();
    }

    activities : Activity[];
    
    getActivities() {

        //this.activityService.getMockActivities().then((activityList: Activity[]) => this.activityList = activityList);    
        this.activityService.getActivities()
            .subscribe((activity : Activity[]) => this.activities = activity);
    }
}