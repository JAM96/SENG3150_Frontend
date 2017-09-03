/*
 * SERVICE NAME: Packages
 * Role: Retrieving the package data from the backend
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
    import {PackageList} from '../../Objects/Packages/PackageList';
    import {Image} from '../../Objects/Image';
//End Imports

@Injectable()
export class PackageService {
    private packages : PackageList[];
    private loaded : boolean = false;

    constructor(private http : Http, public data : DataService) {}
         
    public fetchPackages() : Observable<any>{
        var url = this.data.getApiUrl('packages');

        return this.http.get(url)
            .map((response:Response) => response.json().result);       
    }

    public fetchPackageItems() : Observable<any>{
        var url = this.data.getApiUrl('packagesitems');

        return this.http.get(url)
            .map((response:Response) => response.json().result);
    }

    public isLoaded() : boolean {
        return this.loaded;
    }

    public getData() : PackageList[] {
        return this.packages;
    }

    public setLoaded(value : boolean) : void {
        this.loaded = value;
    }

    public setData(data : PackageList[]) : void {
        this.packages = data;
    }

    //Assigns images to the packages object and returns it
    public assignImages(data : Image[]) : PackageList[] {
        //Assign images to the packages
        for(var i = 0; i < this.packages.length; i++) {
            this.packages[i].images = [];
            for(var j = 0; j < data.length; j++) {
                if(this.packages[i].premadePackageID == data[j].associatedItemID) {
                    this.packages[i].images.push(data[j]);
                }
            }
        }

        //assign empty image if there is no images for that packages
        for(var i = 0; i < this.packages.length; i++) {
            if(this.packages[i].images[0] == null) {
                var img : Image = {imageID: '', description: '', fileName: '', fileType: 'none', associatedItemID: '', mainAssociatedItemPhoto: false};
                this.packages[i].images[0] = img;
            } 
        }

        return this.packages;
    }
}

