import {Component} from '@angular/core';

//import objects
import {Accommodation} from '../../Objects/Accommodation/Accommodation';

//Import Components
import {AccommodationComponent} from '../../Components/Accomodation/accommodation.component';

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
    private accommodationList : Accommodation[];

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
        this.accommodationList = this.accommodationService.getAccommodation();
    }

    private checkLoad() : boolean {
        if(this.imageService.isLoaded() && this.accommodationService.isAccommodationLoaded()) {
            return true;
        } else {
            return false;
        }
    }
 }