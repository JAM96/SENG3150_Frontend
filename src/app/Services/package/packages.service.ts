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
}

