import { NgModule }      from '@angular/core';

//providers
import {HttpModule, JsonpModule} from '@angular/http';
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

import {HomeComponent} from '../Components/home/home.component';

  //Navigation Pages
  import {AboutComponent} from '../Components/about/about.component';
  import {EventViewComponent} from '../Components/event/eventoverview.component';
  import {ActivitiesComponent} from '../Components/activities/activities.component';
  import {FoodComponent} from '../Components/food/food.component';
  import {AccomodationComponent} from '../Components/accomodation/accomodation.component';
  import {ContactComponent} from '../Components/contact/contact.component';
  import {ShoppingCartComponent} from '../Components/shoppingCart/shoppingCart.component';
  import {AdminComponent} from '../Components/admin/admin.component';
  import {CreateAccommodationComponent} from '../Components/admin/create/accommodation/createAccommodation.component';
  import {CreateAccommodationFeatureComponent} from "../Components/admin/create/accommodationFeature/createAccommodationFeature.component";

  import {CreateCustomPackageInitialComponent} from '../Components/package/packages/custom-package/custom-initial-form/create-custom-package.component';
  import {NavigationTopComponent, LoginPopupComponent, notificationsPopupComponent} from '../Components/navigation/navigationtop/navigationtop.component';

  //Profile Component and Profile Components
  import {ProfileComponent} from '../Components/profile/profile.component';
  import {ViewPackagesComponent} from '../Components/profile/viewPackages/viewPackages.component';
  import {ViewVouchersComponent} from '../Components/profile/viewVouchers/viewVouchers.component';
  import {LeaveFeedbackComponent} from '../Components/profile/leaveFeedback/leaveFeedback.component';
  //packages components
  import {CustomPackageComponent} from '../Components/package/packages/custom-package/custom-form/custom-package.component';
  import {CustomCalendarComponent} from '../Components/package/packages/custom-package/custom-initial-form/custom-calendar/custom-calendar.component';
  import {TruncatePipe} from '../Components/package/packages/custom-package/custom-initial-form/custom-calendar/calendar-truncate.pipe';
  import {PackageCategoryComponent, PackageCategoryComponentDialog} from '../Components/package/packagecategory.component';
  import {PackagesComponent} from '../Components/package/packages/packagesview.component';
//import services here
import {CanDeactivateGuard} from '../Components/guards/can-deactivate-guard.service';


//ng2 
import {AsideModule} from 'ng2-aside';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

//calendar

//custom package service
import {CustomPackageService} from '../Components/package/packages/custom-package/custom-package-service/custom-package.service';

//test component
import {TestComponent} from '../Components/test-component/test.component';


//add module imports and component declarations here...
@NgModule({
  imports:      [ 
    BrowserModule,
    HttpModule,
    JsonpModule,
    MaterialModule,
    MdDatepickerModule,
    MdNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    Md2Module.forRoot(),
    ReactiveFormsModule,
    routing,
    AsideModule,
    SlimLoadingBarModule.forRoot(),
    ],
  declarations: [
    AppComponent,
    TestComponent,
    HomeComponent,
    AboutComponent,
    ActivitiesComponent,
    AdminComponent,
    CreateCustomPackageInitialComponent,
    CreateAccommodationComponent,
    CreateAccommodationFeatureComponent,
    NavigationTopComponent,
    LoginPopupComponent,
    notificationsPopupComponent,
    EventViewComponent,
    PackageCategoryComponentDialog,
    PackageCategoryComponent,
    PackagesComponent,
    ProfileComponent,
    CustomPackageComponent,
    FoodComponent,
    AccomodationComponent,
    ContactComponent,
    ShoppingCartComponent,
    ViewPackagesComponent,
    ViewVouchersComponent,
    LeaveFeedbackComponent,
    CustomCalendarComponent,
    TruncatePipe
    ],
  bootstrap:    [ AppComponent, PackageCategoryComponentDialog, LoginPopupComponent, notificationsPopupComponent],
  providers: [
    appRoutingProviders,
    CustomPackageService,
    CanDeactivateGuard,
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
