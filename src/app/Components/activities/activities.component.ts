import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route } from '@angular/router';
import {ActivityList} from '../../Objects/Activity/ActivityList';
import {ActivityService} from '../../Services/activities/activities.service';

@Component({
    moduleId: module.id,
    selector: 'activities',
    templateUrl: 'activities.component.html',
    providers: [ActivityService]
})

export class ActivitiesComponent {
        
        constructor(private activityService : ActivityService){}

        activityList : ActivityList[];
        
        getActivities() {

            this.activityService.getMockActivities().then((activityList: ActivityList[]) => this.activityList = activityList);    
        /*
        console.log('retrieving food');
        
       
        this.activityService.getActivities()
            .subscribe((activity : ActivityList[]) => this.activity = activity);
        */
    }
}