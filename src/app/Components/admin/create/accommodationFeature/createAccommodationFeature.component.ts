import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {HttpService} from '../../../../Services/http/http.service';

@Component({
    moduleId: module.id,
    selector: 'createAccommodationFeature',
    templateUrl: 'createAccommodationFeature.component.html'
})

export class CreateAccommodationFeatureComponent{
    //This is the number which represents the page that the user wants to go to next.
    //Set to 0 (ie. back to the admin panel starting page), by default.
    selectedOption:number = 0;

    constructor(
        public router: Router,
        private _httpService: HttpService
    ){}

    setNavOption(selection: number){
        this.selectedOption = selection;

        switch(this.selectedOption){
            case 0: this.router.navigate(['/admin']); break;
        }
    }

    sendDataToServer(dataFromForm: any){
        this._httpService.sendData(dataFromForm).subscribe(
            response => console.log(response), //success
            error => console.log(error), //error
            () => console.log('completed')) //complete
    }
}