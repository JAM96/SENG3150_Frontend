
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route } from '@angular/router';
import {PackageList} from '../../../Objects/Packages/PackageList';
import {PackageService} from '../../../Services/Package/packages.service';
import {DataService} from '../../../Services/data.service';
import {AuthService} from '../../../auth/auth.service';

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
    profile : any;
    guests : number = 0;

    constructor(
        private route: ActivatedRoute, 
        private _packageService: PackageService,
        public data : DataService,
        public auth: AuthService,
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
        if (this.auth.userProfile) {
          this.profile = this.auth.userProfile;
        } else {
          this.auth.getProfile((err, profile) => {
            this.profile = profile;
          });
        }
      }
}