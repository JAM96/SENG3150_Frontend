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
  startDate: Date = new Date;
  endDate: Date = new Date;
  nights = Math.ceil(
            (Math.abs(this.endDate.getTime() - this.startDate.getTime()))
            / (1000*3600*24)
            )
  
  ngOnInit() {
    if(this.startDate == null) {
      this.startDate = new Date;
    }

    if(this.endDate == null) {
      this.endDate = new Date;
    }
  }

  constructor(public dialog: MdDialog, public router:Router) {/*
     if(this.startDate == null) {
      this.startDate = new Date;
    }

    if(this.endDate == null) {
      this.endDate = new Date;
    }

    var timeDiff = Math.abs(this.endDate.getTime() - this.startDate.getTime());
    var dayDiff = Math.ceil(timeDiff / (1000*3600*24));
    this.nights = dayDiff;*/
  }

  openDateForm(category:Number) {
    let dialogRef = this.dialog.open(PackageCategoryComponentDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;

      if(this.selectedOption=="submit") {
        //this is how to navigate to another page, it updates the URL to .../packages
        this.router.navigate(['/packages'])
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