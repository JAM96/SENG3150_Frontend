import {Injectable} from '@angular/core';

import {ActivityList} from '../../Objects/Activity/ActivityList';
import {ACTIVITY_LIST} from '../../Objects/Activity/MockData/mock-activity';



@Injectable()
export class ActivityService {
    getActivities() {
        return Promise.resolve(ACTIVITY_LIST);
    }

    constructor() {}
 
}