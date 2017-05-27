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
        activity : ActivityList[];
        getActivities() {
        this.activityService.getMockActivities().then((activity: ActivityList[]) => this.activity = activity);    
        /*
        console.log('retrieving food');
        
       
        this.activityService.getActivities()
            .subscribe((activity : ActivityList[]) => this.activity = activity);
        */
    }
}