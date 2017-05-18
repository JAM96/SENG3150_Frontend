import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'package-set-date',
    templateUrl: 'package.setdate.component.html'
})

export class PackageSetDateComponent {
    constructor(public dialogRef: MdDialogRef<PackageSetDateComponent>) {}
}