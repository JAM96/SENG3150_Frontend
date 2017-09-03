/*
 * SERVICE NAME: Activity
 * Role: Retrieving the activity data from the backend
 */

//Imports
    //core imports
    import {Injectable} from '@angular/core';
    import {Http, Response} from "@angular/http";
    import {Observable}     from 'rxjs/Observable';
    import 'rxjs/add/operator/catch';
    import 'rxjs/add/operator/map';
//Data service
    import {DataService} from '../data.service';
//Objects
    import {Activity} from '../../Objects/Activity/Activity';
    import {Tag} from '../../Objects/Tag';
    import {BookingTime} from '../../Objects/BookingTime';
    import {Image} from '../../Objects/Image';
//End Imports

@Injectable()
export class ActivityService {
    private activities : Activity[];
    private loaded : boolean = false;

    private url : string = this.data.getApiUrl('activity');

    constructor(private http : Http, public data : DataService) {}

    public fetchActivities() : Observable<any> {
        return this.http.get(this.url)
            .map((response:Response) => response.json().result)   
    }

    public isLoaded() : boolean {
        return this.loaded;
    }

    public getData() : Activity[] {
        return this.activities;
    }

    public setLoaded(value : boolean) : void {
        this.loaded = value;
    }

    public setData(data : Activity[]) : void {
        this.activities = data;
    }

    //Assigns images to the activities object and returns it
    public assignImages(data : Image[]) : Activity[] {
        //Assign images to the activities
        for(var i = 0; i < this.activities.length; i++) {
            this.activities[i].images = [];
            for(var j = 0; j < data.length; j++) {
                if(this.activities[i].activityID == data[j].associatedItemID) {
                    this.activities[i].images.push(data[j]);
                }
            }
        }

        //assign empty image if there is no images for that activities
        for(var i = 0; i < this.activities.length; i++) {
            if(this.activities[i].images[0] == null) {
                var img : Image = {imageID: '', description: '', fileName: '', fileType: 'none', associatedItemID: '', mainAssociatedItemPhoto: false};
                this.activities[i].images[0] = img;
            } 
        }


        return this.activities;
    }
}