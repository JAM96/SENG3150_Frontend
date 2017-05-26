import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route } from '@angular/router';
import {PackageList} from '../../../Objects/PackageList';
import {PackagesService} from '../../../Services/package/packages.service';

import {PackageCategoryComponent} from '../packagecategory.component';

@Component({
    moduleId: module.id,
    selector: 'packages',
    templateUrl: 'packagesview.component.html',
    providers: [PackagesService]
})

export class PackagesComponent implements OnInit{
    public packages: PackageList[];

    sub : any;

    minDate = new Date();

    startDate: Date;
    endDate: Date;
    category: string;

    guests : number = 0;

    constructor(private route: ActivatedRoute, private _packagesService: PackagesService) {}

    getPackages() {
        this._packagesService.getPackages().then((packages: PackageList[]) => this.packages = packages);
    }

    increaseGuests() {
        this.guests = this.guests + 1;
    }
    decreaseGuests() {
        if(this.guests != 0) {
        this.guests = this.guests- 1;
        }
    }

    ngOnInit() {
        this.getPackages();

        this.sub = this.route.params.subscribe(params => {
          this.startDate = params['startDate'];
          this.endDate = params['endDate'];
          this.category = params['category'];
        }); 
    }
}