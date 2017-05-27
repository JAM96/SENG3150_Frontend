import {Injectable} from '@angular/core';

import {Activity} from '../../Objects/Activity/Activity';
import {ACTIVITY_LIST} from '../../Objects/Activity/MockData/mock-activity';

import {Http, Response} from "@angular/http";
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ActivityService {
    private url : string = "http://localhost:8080/activities"
    
    constructor(private http : Http) {}

    data : Activity[]

    getActivities() {
        return this.http.get(this.url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
       
    }

    getMockActivities() {
        return Promise.resolve(ACTIVITY_LIST);
    }
}