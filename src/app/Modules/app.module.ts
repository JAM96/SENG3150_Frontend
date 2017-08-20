import { NgModule }      from '@angular/core';

//providers
import {HttpModule} from '@angular/http';
//used for Auth0
import {routing, appRoutingProviders} from '../app.routing';
import {AUTH_PROVIDERS} from 'angular2-jwt';
//Used for navigation
import {RouterModule, Routes, Router, NavigationStart} from '@angular/router';

//some tutorial code, probs not needed, *update* formsmodule is needed
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//google maps
import {AgmCoreModule} from '@agm/core';

//used for the material module (popups)
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, MdDatepickerModule, MdNativeDateModule} from '@angular/material';

//used for the calendar popup
import { Md2Module }  from 'md2';
import { MyDateRangePickerModule } from 'mydaterangepicker';


//import app
import { AppComponent }  from '../Components/app.component';

//import components here

import {HomeComponent} from '../Components/home/home.component';

  //Navigation Pages
  import {AboutComponent} from '../Components/about/about.component';
  import {EventViewComponent} from '../Components/event/eventoverview.component';
  import {ActivityComponent} from '../Components/activities/activity.component';
  import {FoodAndDrinksComponent} from '../Components/food-and-drinks/food-and-drinks.component';
  import {AccomodationComponent} from '../Components/accomodation/accomodation.component';
  import {ContactComponent} from '../Components/contact/contact.component';
  import {ShoppingCartComponent} from '../Components/shoppingCart/shoppingCart.component';
  import {AdminComponent} from '../Components/admin/admin.component';
  import {CreateAccommodationComponent} from '../Components/admin/create/accommodation/createAccommodation.component';

  import {CreateCustomPackageInitialComponent} from '../Components/package/packages/custom-package/custom-initial-form/create-custom-package.component';
  import {NavigationTopComponent, LoginPopupComponent, notificationsPopupComponent} from '../Components/navigation/navigationtop/navigationtop.component';

  //Profile Component and Profile Components
  import {ProfileComponent} from '../Components/profile/profile.component';
  import {ViewPackagesComponent} from '../Components/profile/viewPackages/viewPackages.component';
  import {ViewVouchersComponent} from '../Components/profile/viewVouchers/viewVouchers.component';
  import {LeaveFeedbackComponent} from '../Components/profile/leaveFeedback/leaveFeedback.component';
  //packages components
  import {
    CustomPackageComponent, 
    AddAccommodationComponent,
    BudgetChangeComponent,
    AddFoodAndDrinksComponent,
    AddActivityComponent
  } from '../Components/package/packages/custom-package/custom-form/custom-package.component';
  import {CustomCalendarComponent} from '../Components/package/packages/custom-package/custom-initial-form/custom-calendar/custom-calendar.component';
  import {TruncatePipe} from '../Components/package/packages/custom-package/custom-initial-form/custom-calendar/calendar-truncate.pipe';
  import {PackageCategoryComponent, PackageCategoryComponentDialog} from '../Components/package/packagecategory.component';
  import {PackagesComponent} from '../Components/package/packages/packagesview.component';
//import services here
import {CanDeactivateGuard} from '../Components/guards/can-deactivate-guard.service';
import {DataService} from '../Services/data.service';
import {IndividualAccommodationService} from '../Services/Accommodation/individual-accommodation.service';
import {IndividualFoodAndDrinksService} from '../Services/FoodAndDrinks/individual-food-and-drinks.service';
import {IndividualActivityService} from '../Services/Activity/individual-activity.service';

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
    MyDateRangePickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAMwjWTDQg0aVK9flKslyeB5wKBBCq46Cg'
    }),
    ],
  declarations: [
    AppComponent,
    TestComponent,
    HomeComponent,
    AboutComponent,
    ActivityComponent,
    AdminComponent,
    CreateCustomPackageInitialComponent,
    CreateAccommodationComponent,
    NavigationTopComponent,
    LoginPopupComponent,
    BudgetChangeComponent,
    AddAccommodationComponent,
    AddFoodAndDrinksComponent,
    AddActivityComponent,
    notificationsPopupComponent,
    EventViewComponent,
    PackageCategoryComponentDialog,
    PackageCategoryComponent,
    PackagesComponent,
    ProfileComponent,
    CustomPackageComponent,
    FoodAndDrinksComponent,
    AccomodationComponent,
    ContactComponent,
    ShoppingCartComponent,
    ViewPackagesComponent,
    ViewVouchersComponent,
    LeaveFeedbackComponent,
    CustomCalendarComponent,
    TruncatePipe
    ],
  bootstrap: [ 
    AppComponent, 
    PackageCategoryComponentDialog, 
    BudgetChangeComponent, 
    LoginPopupComponent,
    AddAccommodationComponent, 
    AddFoodAndDrinksComponent,
    AddActivityComponent,
    notificationsPopupComponent
  ],
  providers: [
    appRoutingProviders,
    CustomPackageService,
    IndividualAccommodationService,
    IndividualFoodAndDrinksService,
    IndividualActivityService,
    DataService,
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
