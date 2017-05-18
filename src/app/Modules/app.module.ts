import { NgModule }      from '@angular/core';
import {RouterModule} from '@angular/router';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';

import { Md2Module }  from 'md2';
import { AppComponent }  from '../Components/app.component';

//import components here
import {AboutComponent} from '../Components/about/about.component';
import {NavigationComponent} from '../Components/navigation/navigation/navigation.component';
import {NavigationTopComponent} from '../Components/navigation/navigationtop/navigationtop.component';
import {EventViewComponent} from '../Components/event/eventoverview.component';

//packages
import {PackageCategoryComponent, PackageCategoryComponentDialog} from '../Components/package/packagecategory.component';
import {PackageThrillComponent} from '../Components/package/packages/packagesview.component';
import {PackageRelaxComponent} from '../Components/package/packages/packagesview.component';



@NgModule({
  imports:      [ 
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    Md2Module.forRoot(),
    ReactiveFormsModule,
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
    PackageCategoryComponentDialog,
    PackageCategoryComponent,
    PackageThrillComponent,
    PackageRelaxComponent,
    ],
  bootstrap:    [ AppComponent, PackageCategoryComponentDialog]
})
export class AppModule {}
