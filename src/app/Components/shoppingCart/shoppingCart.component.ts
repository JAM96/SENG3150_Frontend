import {Component} from "@angular/core";

import {CustomPackage} from '../../Objects/Packages/CustomPackage/CustomPackage'

import {CustomPackageService} from '../../Services/Package/custom-package.service'

@Component({
    moduleId: module.id,
    selector: 'shopping-cart',
    templateUrl: 'shoppingCart.component.html'
})

export class ShoppingCartComponent {
    custom : CustomPackage;

    constructor(packageService : CustomPackageService) {
        this.custom = packageService.getPackage();
        console.log("Custom package is: ");
        console.log(this.custom)
    }
}