import {Component} from '@angular/core';

//import objects
import {Activity} from '../../../Objects/Activity/Activity';

//import services
import {ActivityService} from '../../../Services/Activity/activity.service';
import {DataService} from '../../../Services/data.service'

@Component({
    moduleId: module.id,
    selector: 'activities-list',
    templateUrl: 'activities-view.component.html',
})

export class ActivitiesListComponent {
    constructor(public data : DataService) {
        data.setNavigation(4);
    }
 }