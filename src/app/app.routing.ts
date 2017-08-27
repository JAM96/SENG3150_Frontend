import {ModuleWithProviders} from '@angular/core';
import {Routes} from '@angular/router';

//guards
import {CanDeactivateGuard} from './Components/guards/can-deactivate-guard.service';
import {AuthGuardService as AuthGuard} from './Components/guards/auth-guard.service';

import {HomeComponent} from './Components/home/home.component';

//Profile Components
import {ProfileComponent} from './Components/profile/profile.component';
import {ViewPackagesComponent} from './Components/profile/viewPackages/viewPackages.component';
import {ViewVouchersComponent} from './Components/profile/viewVouchers/viewVouchers.component';

//Custom Package Components
import {CustomPackageComponent} from './Components/package/custom-package/custom-package.component';
import {ShoppingCartComponent} from './Components/shoppingCart/shoppingCart.component';

//Views
import {AccommodationListComponent} from './Components/accomodation/accommodationListView.component';
import {ActivitiesListComponent} from './Components/activities/activities-list/activityList.component';
import {FoodAndDrinksListComponent} from './Components/food-and-drinks/food-and-drinks-view/food-and-drinks-view.component';

import {AboutComponent} from './Components/about/about.component';
import {PackagesComponent} from './Components/package/packagesview.component';
import {EventListComponent} from './Components/event/eventListView.component';

//callback
import {CallbackComponent} from './callback/callback.component';
/*
app routes
  add new routes here
  default route will be localhost:3000/ which will redirect to localhost:3000/home
  the home component contains the first view that the user will see, and then the user can navigate elsewhere, such as
  packages
*/
export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent},

  //Navigation Views
  { path: 'events', component: EventListComponent, },
  { path: 'packages', component: PackagesComponent},
  { path: 'activities', component: ActivitiesListComponent},
  { path: 'food-and-drinks', component: FoodAndDrinksListComponent},
  { path: 'accommodation', component: AccommodationListComponent},
  { path: 'about', component: AboutComponent},

  //Profile Paths
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'profile/viewPackages', component: ViewPackagesComponent, canActivate:[AuthGuard]},
  { path: 'profile/viewVouchers', component: ViewVouchersComponent, canActivate:[AuthGuard]},
  
  //Custom Package
  { 
    path: 'createpackage', 
    component: CustomPackageComponent,
    canDeactivate: [CanDeactivateGuard],
    },
  { path: 'shoppingCart', component: ShoppingCartComponent},
  
  //Redirect
  { path: '**', redirectTo: '' },
  { path: 'home', redirectTo: ''}
]