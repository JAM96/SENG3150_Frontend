/*
 * SERVICE NAME: Packages
 * Role: Retrieving the package data from the backend
 */

//Imports
    import {Injectable} from '@angular/core';
    import {PACKAGE_LIST} from '../../Objects/Packages/mock-packages';
    import {Http, Response} from "@angular/http";
    import {Observable}     from 'rxjs/Observable';
    import 'rxjs/add/operator/catch';
    import 'rxjs/add/operator/map';
    import {DataService} from '../data.service';
//end imports

@Injectable()
export class PackageService {
    constructor(private http : Http, public data : DataService) {}
         
    url = this.data.getApiUrl('packages');


    getPackages() {
        return this.http.get(this.url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
       
    }

    getMockPackages() {
        return Promise.resolve(PACKAGE_LIST);
    }
}

