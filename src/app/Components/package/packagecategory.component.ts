import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router} from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'packages-category',
    templateUrl: 'packagecategory.component.html'
})


export class PackageCategoryComponent implements OnInit{
  parentRouter = Router;
  selectedOption: string;
  category: string = 'thrill';
  startDate: Date
  endDate: Date
  nights: Number;

  updateNights() {
    alert('test');
    // this.nights = Math.ceil(
    //         (Math.abs(this.endDate.getTime() - this.startDate.getTime()))
    //         / (1000*3600*24)
    //         )
  }
  
  ngOnInit() {
  }

  constructor(public dialog: MdDialog, public router:Router) {
    this.startDate = new Date();
    this.endDate = new Date();
  }

  openDateForm(category:Number) {
    let dialogRef = this.dialog.open(PackageCategoryComponentDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;

      if(this.selectedOption=="submit") {
        //this is how to navigate to another page, it updates the URL to .../packages
        this.router.navigate(['/packages', {startDate : this.startDate, endDate: this.endDate, category: this.category}])
      }
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