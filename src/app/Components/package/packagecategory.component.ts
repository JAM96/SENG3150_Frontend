import {Component} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';


@Component({
    moduleId: module.id,
    selector: 'packages-category',
    templateUrl: 'packagecategory.component.html'
})


export class PackageCategoryComponent {
  selectedOption: string;

  constructor(public dialog: MdDialog) {}

  openDateForm(category:Number) {
    let dialogRef = this.dialog.open(PackageCategoryComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }
}


@Component({
  moduleId: module.id,
  selector: 'package-setdate',
  templateUrl: 'package-setdate.component.html',
})
export class PackageCategoryComponentDialog {
  constructor(public dialogRef: MdDialogRef<PackageCategoryComponentDialog>) {}
}