import {Injectable} from '@angular/core';

import {PackageList} from '../../Objects/PackageList';
import {PACKAGE_LIST} from '../../Objects/mock-packages';



@Injectable()
export class PackagesService {
    getPackages() {
        return Promise.resolve(PACKAGE_LIST);
    }

    constructor() {}
 
}