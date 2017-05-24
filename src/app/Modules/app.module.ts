import { NgModule }      from '@angular/core';

//used for Auth0
import {routing, appRoutingProviders} from '../app.routing';
import {AUTH_PROVIDERS} from 'angular2-jwt';
//Used for navigation
import {RouterModule, Routes, Router, NavigationStart} from '@angular/router';

//some tutorial code, probs not needed, *update* formsmodule is needed
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


//used for the material module (popups)
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, MdDatepickerModule, MdNativeDateModule} from '@angular/material';

//used for the calendar popup
import { Md2Module }  from 'md2';

//import app
import { AppComponent }  from '../Components/app.component';

//import components here
import {AboutComponent} from '../Components/about/about.component';
import {HomeComponent} from '../Components/home/home.component';
import {CreateCustomPackageInitialComponent} from '../Components/package/packages/custom-package/custom-initial-form/create-custom-package.component';
import {NavigationTopComponent, LoginPopupComponent, notificationsPopupComponent} from '../Components/navigation/navigationtop/navigationtop.component';
import {EventViewComponent} from '../Components/event/eventoverview.component';
import {ActivitiesComponent} from '../Components/activities/activities.component';
import {ProfileComponent} from '../Components/profile/profile.component';
//packages components
import {CustomPackageComponent} from '../Components/package/packages/custom-package/custom-form/custom-package.component';
import {PackageCategoryComponent, PackageCategoryComponentDialog} from '../Components/package/packagecategory.component';
import {PackagesComponent} from '../Components/package/packages/packagesview.component';
//import services here


//add module imports and component declarations here...
@NgModule({
  imports:      [ 
    BrowserModule,
    MaterialModule,
    MdDatepickerModule,
    MdNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    Md2Module.forRoot(),
    ReactiveFormsModule,
    routing
    ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ActivitiesComponent,
    CreateCustomPackageInitialComponent,
    NavigationTopComponent,
    LoginPopupComponent,
    notificationsPopupComponent,
    EventViewComponent,
    PackageCategoryComponentDialog,
    PackageCategoryComponent,
    PackagesComponent,
    ProfileComponent,
    CustomPackageComponent
    ],
  bootstrap:    [ AppComponent, PackageCategoryComponentDialog, LoginPopupComponent, notificationsPopupComponent],
  providers: [
    appRoutingProviders,
    //AUTH_PROVIDERS,
    //Auth
  ]
})
export class AppModule {
  constructor(router: Router) {
    router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) { 
          console.log('router path:', event.url); 
        } 
      });
  }
}
