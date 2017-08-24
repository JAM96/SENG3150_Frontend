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
    
  }
  
  ngOnInit() {
  }

  constructor(public dialog: MdDialog, public router:Router) {
    this.startDate = new Date();
    this.endDate = new Date();
  }

  openDateForm(category:Number) {
    
  }
}