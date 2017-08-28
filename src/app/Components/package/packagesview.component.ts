import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route } from '@angular/router';
import {PackageList} from '../../Objects/Packages/PackageList';
import {Image} from '../../Objects/Image';
import {PackageService} from '../../Services/Package/packages.service';
import {DataService} from '../../Services/data.service';
import {ImageService} from '../../Services/image.service';


@Component({
    moduleId: module.id,
    selector: 'packages',
    templateUrl: 'packagesview.component.html',
    providers: [PackageService]
})

export class PackagesComponent implements OnInit{
    private packages: PackageList[];
    private imageList : Image[];

    private imagesLoaded : boolean = false;
    private packagesLoaded : boolean = false;

    sub : any;

    minDate = new Date();

    startDate: Date;
    endDate: Date;
    category: string;

    guests : number = 0;

    constructor(
        private route: ActivatedRoute, 
        private packageService: PackageService,
        private data : DataService,
        private imageService : ImageService,
    ) {
        data.setNavigation(2);
    }

    fetch() {
        //this._packageService.getMockPackages().then((packages: PackageList[]) => this.packages = packages);
        
        console.log("attempting to packages");
        //Load Images
        this.imageService.fetchImages().subscribe((image : Image[]) => {
            this.imageList = image;
            this.imagesLoaded = true;
            console.log("Images have loaded");
            console.log(this.imageList);
            
            //Load Packages
            this.packageService.fetchPackages().subscribe((packages : PackageList[]) => {
                this.packages = packages;
                this.packagesLoaded = true;
                
                //Assign images to the packages
                for(var i = 0; i < this.packages.length; i++) {
                    this.packages[i].images = [];
                    for(var j = 0; j < this.imageList.length; j++) {
                        if(this.packages[i].premadePackageID == this.imageList[j].associatedItemID) {
                            this.packages[i].images.push(this.imageList[j]);
                        }
                    }
                }

                //assign empty image if there is no images for that packages item
                for(var i = 0; i < this.packages.length; i++) {
                    if(this.packages[i].images[0] == null) {
                        var img : Image = {imageID: '', description: '', fileName: '', fileType: 'none', associatedItemID: '', base64Equiv: ''};
                        this.packages[i].images[0] = img;
                    }
                }
                console.log("Images have been assigned, packages is now complete");
                console.log(this.packages);
            });
        });
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
        this.fetch();

        this.sub = this.route.params.subscribe(params => {
          this.startDate = params['startDate'];
          this.endDate = params['endDate'];
          this.category = params['category'];
        }); 
    }

    private checkLoad() : boolean {
        if(this.imagesLoaded && this.packagesLoaded) {
            return true;
        } else {
            return false;
        }
    }
}