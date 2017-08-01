import {Component} from '@angular/core'
import {Router} from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'createAccommodation',
    templateUrl: 'createAccommodation.component.html'
})

export class CreateAccommodationComponent{
    // //This is the number which represents the page that the user wants to go to next.
    // //Set to 0 (ie. back to the home page), by default.
    // selectedOption:number = 0;

    // constructor(
    //     public router: Router
    // ){}

    // setNavOption(selection: number){
    //     this.selectedOption = selection;

    //     switch(this.selectedOption){
    //         case 0: this.router.navigate(['/']); break;
    //         case 1: this.router.navigate(['/createAccommodation']); break;
    //         case 2: this.router.navigate(['/createPackage']); break;
    //         case 3: this.router.navigate(['/createActivity']); break;
    //         case 4: this.router.navigate(['/createEvent']); break;
    //         case 5: this.router.navigate(['/createFoodAndDrink']); break;
    //     }
    // }
}