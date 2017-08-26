import {Component, Input, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

//import objects
import {Activity} from '../../Objects/Activity/Activity';

//import services
import {ActivityService} from '../../Services/Activity/activity.service';

@Component({
    moduleId: module.id,
    selector: 'event-list',
    templateUrl: 'eventListView.component.html',
})

export class EventListComponent { }