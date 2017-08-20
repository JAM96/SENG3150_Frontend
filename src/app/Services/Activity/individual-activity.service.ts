/*
 * SERVICE NAME: Activity
 * Role: Storing and sending one activity item through components
 * Created By: Jack Mennie
 * Date Created: 20/08/17 
 */

//Imports
    import {Injectable} from '@angular/core';
    import {Activity} from '../../Objects/Activity/Activity';
//end imports

@Injectable()
export class IndividualActivityService {
    activity : Activity;

    constructor() {}

    setActivity(activity : Activity) {
        this.activity = activity;
    }

    getActivity() : Activity {
        return this.activity;
    };
}