import {Injectable} from '@angular/core';

import {Test} from './test';
import {TEST_LIST} from './test-list';

import {Http, Response} from "@angular/http";
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TestService {
    private url : string = "http://localhost:8080/familySizeEstimatesJSON"
    data : Test[]

    constructor(private http : Http) {
        // this.http.get(this.url)
        //     .map((response: Response) => response.json().result)
        //     .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
        //     .subscribe(test =>this.data = test);

        
    }



    getTest() {
        //return this.data;
        return this.http.get(this.url)
            .map((response:Response) => response.json().result)
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getMockTest() {
        return Promise.resolve(TEST_LIST);
    }
}