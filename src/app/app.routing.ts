import {ModuleWithProviders} from '@angular/core';
import {Routes} from '@angular/router';

//guards
import {CanDeactivateGuard} from './Components/guards/can-deactivate-guard.service';
import {AuthGuardService as AuthGuard} from './Components/guards/auth-guard.service';

import {HomeComponent} from './Components/home/home.component';
import {ProfileComponent} from './Components/profile/profile.component';
import {ViewPackagesComponent} from './Components/profile/viewPackages/viewPackages.component';
import {ViewVouchersComponent} from './Components/profile/viewVouchers/viewVouchers.component';
import {LeaveFeedbackComponent} from './Components/profile/leaveFeedback/leaveFeedback.component';
import {AboutComponent} from './Components/about/about.component';
import {PackagesComponent} from './Components/package/packages/packagesview.component';
import {EventViewComponent} from './Components/event/eventoverview.component';
import {CustomPackageComponent} from './Components/package/packages/custom-package/custom-form/custom-package.component';
import {ActivityComponent} from './Components/activities/activity.component';
import {FoodAndDrinksComponent} from './Components/food-and-drinks/food-and-drinks.component';
import {AccomodationComponent} from './Components/accomodation/accomodation.component';
import {ContactComponent} from './Components/contact/contact.component';
import {ShoppingCartComponent} from './Components/shoppingCart/shoppingCart.component';

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
  { path: 'events', component: EventViewComponent, },
  { path: 'packages', component: PackagesComponent},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'profile/viewPackages', component: ViewPackagesComponent, canActivate:[AuthGuard]},
  { path: 'profile/viewVouchers', component: ViewVouchersComponent, canActivate:[AuthGuard]},
  { path: 'profile/leaveFeedback', component: LeaveFeedbackComponent, canActivate:[AuthGuard] },
  { 
    path: 'createpackage', 
    component: CustomPackageComponent,
    canDeactivate: [CanDeactivateGuard],
    },
  { path: 'activities', component: ActivityComponent},
  { path: 'food-and-drinks', component: FoodAndDrinksComponent},
  { path: 'accommodation', component: AccomodationComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'shoppingCart', component: ShoppingCartComponent},
  { path: '**', redirectTo: '' }
]