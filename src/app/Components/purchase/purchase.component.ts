import {Component} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'purchase',
    templateUrl: 'purchase.component.html',
})

export class PurchaseComponent {
    name : string = "Jack Mennie"
    email : string = "jack.mennie@live.com"

    barcodeValue : string = "CP: 329232932932";

    constructor(){}
}