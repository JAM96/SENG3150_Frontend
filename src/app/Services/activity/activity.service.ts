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
    private url = this.data.getApiUrl('activity');

    constructor(private http : Http, public data : DataService) {}

    getActivities() {
        return this.http.get(this.url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Cannot connect to the backend'));
       
    }
}