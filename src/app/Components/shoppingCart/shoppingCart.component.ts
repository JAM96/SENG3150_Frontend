import {Component} from "@angular/core";
import {Router} from '@angular/router'
import {FormControl, Validators} from '@angular/forms';

import {CustomPackage} from '../../Objects/Packages/CustomPackage/CustomPackage'
import {Accommodation} from '../../Objects/Accommodation/Accommodation';
import {CustomPackageService} from '../../Services/Package/custom-package.service'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
    moduleId: module.id,
    selector: 'shopping-cart',
    templateUrl: 'shoppingCart.component.html'
})



export class ShoppingCartComponent {
    custom : CustomPackage;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);

    constructor(packageService : CustomPackageService, private router : Router) {
        this.custom = packageService.getPackage();

        if(this.custom.accommodation == null) {
            var temp : Accommodation = new Accommodation;
            console.log("accommodation not defined");
            this.custom.accommodation = temp;
            this.custom.accommodation.accommodationName = "";
        }
        console.log("Custom package is: ");
        console.log(this.custom)
    }

    showPurchase() {
        this.router.navigate(['/purchase']);
    }
}