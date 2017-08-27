
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route } from '@angular/router';
import {PackageList} from '../../../Objects/Packages/PackageList';
import {PackageService} from '../../../Services/Package/packages.service';
import {DataService} from '../../../Services/data.service';


@Component({
    moduleId: module.id,
    selector: 'viewPackages',
    templateUrl: 'viewPackages.component.html',
    providers: [PackageService]
})

export class ViewPackagesComponent implements OnInit{
    public packages: PackageList[];

    sub : any;

    minDate = new Date();

    startDate: Date;
    endDate: Date;
    category: string;

    guests : number = 0;

    constructor(
        private route: ActivatedRoute, 
        private _packageService: PackageService,
        public data : DataService,
    ) {
        data.setNavigation(2);
    }

    getPackages() {
        this._packageService.getMockPackages().then((packages: PackageList[]) => this.packages = packages);
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