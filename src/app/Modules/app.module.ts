import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {MaterialModule} from '@angular/material';


import { AppComponent }  from '../Components/app.component';

//import components here
import {AboutComponent} from '../Components/about/about.component';
import {NavigationComponent} from '../Components/navigation/navigation/navigation.component';
import {NavigationTopComponent} from '../Components/navigation/navigationtop/navigationtop.component';
import {EventViewComponent} from '../Components/event/eventoverview.component';

//packages
import {PackageCategoryComponent} from '../Components/package/packagecategory.component';
import {PackageThrillComponent} from '../Components/package/packages/packagesview.component';
import {PackageRelaxComponent} from '../Components/package/packages/packagesview.component';
//import { PackageSetDateComponent } from '../Components/package/dialog/package.setdate.component';



@NgModule({
  imports:      [ 
    BrowserModule,
  //  BrowserAnimationsModule,
   // MaterialModule,
    RouterModule.forRoot([
      {
        path: 'packages',
        component: PackageCategoryComponent,
      },
      {
        path: 'packages\thrill',
        component: PackageThrillComponent
      },
      {
        path: 'packages\relax',
        component: PackageRelaxComponent
      }
    ]),
   
    ],
  declarations: [
    AppComponent,
    AboutComponent,
    NavigationComponent,
    NavigationTopComponent, 
    EventViewComponent,
    PackageCategoryComponent,
    PackageThrillComponent,
    PackageRelaxComponent,
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {
}
