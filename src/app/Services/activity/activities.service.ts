import {Injectable} from '@angular/core';

import {ActivityList} from '../../Objects/Activity/ActivityList';
import {ACTIVITY_LIST} from '../../Objects/Activity/MockData/mock-activity';

import {Http, Response} from "@angular/http";
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class ActivityService {
    private url : string = "http://localhost:8080/accommodation"
    constructor(private http : Http) {}
    getActivities() {
        return Promise.resolve(ACTIVITY_LIST);
    }

    getMockActivities() {
        return Promise.resolve(ACTIVITY_LIST);
    }
 
}