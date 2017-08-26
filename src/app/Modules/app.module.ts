import { NgModule }      from '@angular/core';

//providers
import {HttpModule} from '@angular/http';
//used for Auth0
import {ROUTES} from '../app.routing';
import {AUTH_PROVIDERS} from 'angular2-jwt';
//Used for navigation
import {RouterModule, Routes, Router, NavigationStart} from '@angular/router';

//some tutorial code, probs not needed, *update* formsmodule is needed
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//google maps
import {AgmCoreModule} from '@agm/core';

//used for the material module (popups)
import {BrowserModule } from '@angular/platform-browser';
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
  import {EventListComponent} from '../Components/event/eventListView.component';
  import {PackagesComponent} from '../Components/package/packagesview.component';
  import {AccommodationListComponent} from '../Components/accomodation/accommodationListView.component';
  import {ActivitiesListComponent} from '../Components/activities/activities-list/activityList.component';
  import {FoodAndDrinksListComponent} from '../Components/food-and-drinks/food-and-drinks-view/food-and-drinks-view.component';
  import {NavigationTopComponent, notificationsPopupComponent} from '../Components/navigation/navigationtop.component';

  //Profile Component and Profile Components
  import {ProfileComponent} from '../Components/profile/profile.component';
  import {ViewPackagesComponent} from '../Components/profile/viewPackages/viewPackages.component';
  import {ViewVouchersComponent} from '../Components/profile/viewVouchers/viewVouchers.component';
  import {LeaveFeedbackComponent} from '../Components/profile/leaveFeedback/leaveFeedback.component';

  //Custom Package components
    import {
      CustomPackageComponent, 
      AddAccommodationComponent,
      BudgetChangeComponent,
      AddFoodAndDrinksComponent,
      AddActivityComponent
    } from '../Components/package/custom-package/custom-package.component';
    import {ActivityComponent} from '../Components/activities/activity.component';
    import {FoodAndDrinksComponent} from '../Components/food-and-drinks/food-and-drinks.component';
    import {ShoppingCartComponent} from '../Components/shoppingCart/shoppingCart.component';
  
//import services here
  import {CanDeactivateGuard} from '../Components/guards/can-deactivate-guard.service';
  import {AuthGuardService} from '../Components/guards/auth-guard.service'
  import {DataService} from '../Services/data.service';
  import {IndividualFoodAndDrinksService} from '../Services/FoodAndDrinks/individual-food-and-drinks.service';
  import {IndividualActivityService} from '../Services/Activity/individual-activity.service';
  import {AccommodationService} from '../Services/Accommodation/accommodation.service';
  import {FoodAndDrinksService} from '../Services/FoodAndDrinks/food-and-drinks.service';
  import {ActivityService} from '../Services/activity/activity.service';
  import {ImageService} from '../Services/image.service';
//ng2 
//import {AsideModule} from 'ng2-aside';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';


//barcode
import { NgxBarcodeModule } from 'ngx-barcode';
//calendar

//custom package service
import {CustomPackageService} from '../Services/Package/custom-package.service';

//import auth0
import * as auth0 from 'auth0-js'
import {CallbackComponent} from '../callback/callback.component';
import {AuthService} from '../auth/auth.service';

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
    Md2Module,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    //AsideModule,
    SlimLoadingBarModule.forRoot(),
    MyDateRangePickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAMwjWTDQg0aVK9flKslyeB5wKBBCq46Cg'
    }),
    NgxBarcodeModule,
    ],
  declarations: [
    //App
    AppComponent,
    HomeComponent,
    //Navigation Views
    AboutComponent,
    AccommodationListComponent,
    ActivitiesListComponent,
    EventListComponent,
    FoodAndDrinksListComponent,
    NavigationTopComponent,
    PackagesComponent,
    //Profile Components
    LeaveFeedbackComponent,
    notificationsPopupComponent,
    ProfileComponent,
    ViewPackagesComponent,
    ViewVouchersComponent,
    //Custom Package Components
    ActivityComponent,
    AddAccommodationComponent,
    AddFoodAndDrinksComponent,
    AddActivityComponent,
    BudgetChangeComponent,
    CustomPackageComponent,
    FoodAndDrinksComponent,
    ShoppingCartComponent,
    //Other
    CallbackComponent,
    ],
  entryComponents: [
    BudgetChangeComponent,
    AddAccommodationComponent, 
    AddFoodAndDrinksComponent,
    AddActivityComponent,
    notificationsPopupComponent
  ],
  bootstrap: [ 
    AppComponent,
  ],
  providers: [
    CustomPackageService,
    IndividualFoodAndDrinksService,
    IndividualActivityService,
    DataService,
    AuthService,
    CanDeactivateGuard,
    AuthGuardService,
    AccommodationService,
    FoodAndDrinksService,
    ActivityService,
    ImageService,
  ]
})

export class AppModule {
  constructor(){}
}
