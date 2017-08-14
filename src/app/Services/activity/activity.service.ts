/*
 * SERVICE NAME: Activity
 * Role: Retrieving the activity data from the backend
 */

//Imports
    import {Injectable} from '@angular/core';
    import {ACTIVITY_LIST} from '../../Objects/Activity/MockData/mock-activity';
    import {Http, Response} from "@angular/http";
    import { Observable }     from 'rxjs/Observable';
    import {DataService} from '../data.service';
    import 'rxjs/add/operator/catch';
    import 'rxjs/add/operator/map';
//end imports

@Injectable()
export class ActivityService {
    constructor(private http : Http, public data : DataService) {}

    getActivities() {
        var url = this.data.getApiUrl('activity');
        return this.http.get(url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
       
    }

    getMockActivities() {
        return Promise.resolve(ACTIVITY_LIST);
    }
}