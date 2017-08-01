import {Component} from '@angular/core'
import {Router} from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'createAccommodation',
    templateUrl: 'createAccommodation.component.html'
})

export class CreateAccommodationComponent{
    //This is the number which represents the page that the user wants to go to next.
    //Set to 0 (ie. back to the admin panel starting page), by default.
    selectedOption:number = 0;

    constructor(
        public router: Router
    ){}

    setNavOption(selection: number){
        this.selectedOption = selection;

        switch(this.selectedOption){
            case 0: this.router.navigate(['/admin']); break;
        }
    }
}