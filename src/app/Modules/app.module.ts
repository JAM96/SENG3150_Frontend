import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

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



@NgModule({
  imports:      [ 
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'products\thrill',
        component: PackageThrillComponent
      },
      {
        path: 'products\relax',
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