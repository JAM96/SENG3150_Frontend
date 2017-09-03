import {Component} from '@angular/core';

//import objects
import {Accommodation} from '../../Objects/Accommodation/Accommodation';
import {Image} from '../../Objects/Image';
import {Feature} from '../../Objects/Accommodation/Feature';
import {Room} from '../../Objects/Accommodation/Room'


//import services
import {AccommodationService} from '../../Services/Accommodation/accommodation.service';
import {DataService} from '../../Services/data.service';
import {ImageService} from '../../Services/image.service'

@Component({
    moduleId: module.id,
    selector: 'accomodation-list',
    templateUrl: 'accommodationListView.component.html',
})

export class AccommodationListComponent {
    private view : number = 1;
    private imageList : Image[];
    private accommodationList : Accommodation[];

    private imagesLoaded : boolean = false;
    private accommodationLoaded : boolean = false;

    constructor(
        private data : DataService, 
        private accommodationService : AccommodationService,
        private imageService : ImageService,
    ) {
        data.setNavigation(6);
        this.fetch();
    }

    /**
     * The fetch functions calls each service that is required.
     * For this case, the image service and the accommodation service
     * 
     * The fetch function checks if images are loaded or not, if not
     * then subscribe to the image service and append the data to the component
     * 
     * Then it calls the fetch accommodation function.
     */
    private fetch() : void {
        //Load Images
        if(!this.imageService.isLoaded()){
            this.imageService.fetchImages().subscribe((image : Image[]) => {
                this.imageList = image;
                this.imagesLoaded = true;
                this.imageService.setLoaded(true);
                this.imageService.setData(this.imageList);

                console.log("Images have loaded");
                console.log(this.imageList);
                
                if(!this.accommodationService.isAccommodationLoaded()) {
                      this.fetchAccommodation();
                } else {
                    this.accommodationList = this.accommodationService.getAccommodation();
                    this.accommodationLoaded = true;
                }
            });
        } else {
            console.log("images are loaded");
            this.imageList = this.imageService.getData();
            this.imagesLoaded = true;
            
            if(!this.accommodationService.isAccommodationLoaded()) {
                console.log("accommodation is not loaded");
                this.fetchAccommodation();
            } else {
                console.log("accommodaiton is loaded");
                this.accommodationList = this.accommodationService.getAccommodation();
                this.accommodationLoaded = true;
            }
        }
    }

    private fetchAccommodation() {
        //Load Accommodation
        var featuresTemp    : Feature[];
        var roomTemp        : Room[];
        var roomFeatures    : Feature[];

        this.accommodationService.fetchAccommodation().subscribe((accommodation : Accommodation[]) => {
            this.accommodationList = accommodation;
            this.accommodationService.setAccommodation(this.accommodationList);
            

            console.log("Accommodation is now loaded...");

            this.accommodationService.fetchAccommodationFeatures().subscribe((feature : Feature[]) => {
                featuresTemp = feature;
                this.accommodationService.setFeatures(featuresTemp);
            
                console.log("Accommodation Features is now loaded...");
                
                this.accommodationService.fetchAccommodationRooms().subscribe((room : Room[]) => {
                    roomTemp = room;
                    this.accommodationService.setRooms(roomTemp);

                    console.log("Accommodation rooms is now loaded...");
                    this.accommodationService.fetchAccommodationRoomFeatures().subscribe((roomFeature : Feature[]) => {
                        roomFeature = roomFeature;
                        this.accommodationService.setRoomFeatures(roomFeature);
                        
                        this.accommodationLoaded = true;
                        this.accommodationService.setAccommodationLoaded(true);

                        this.accommodationList = this.accommodationService.assign();
                        
                        console.log("Accommodation room features is now loaded...");
                        
                        //Assign images to the accommodation
                        for(var i = 0; i < this.accommodationList.length; i++) {
                            this.accommodationList[i].images = [];
                            for(var j = 0; j < this.imageList.length; j++) {
                                if(this.accommodationList[i].accommodationID == this.imageList[j].associatedItemID) {
                                    this.accommodationList[i].images.push(this.imageList[j]);
                                }
                            }
                        }

                        //assign empty image if there is no images for that accommodation
                        for(var i = 0; i < this.accommodationList.length; i++) {
                            if(this.accommodationList[i].images[0] == null) {
                                console.log("No images found");
                                var img : Image = {imageID: '', description: '', fileName: '', fileType: 'none', associatedItemID: '', base64Equiv: ''};
                                this.accommodationList[i].images[0] = img;
                            } 
                        }
                        console.log("Images have been assigned, accommodation is now complete");
                        console.log(this.accommodationList);
                    });
                });
            });
        }); 
    }

    private checkLoad() : boolean {
        if(this.imagesLoaded && this.accommodationLoaded) {
           // this.completeLoading();
            return true;
        } else {
            return false;
        }
    }
 }