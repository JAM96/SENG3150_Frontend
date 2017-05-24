import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './Components/home/home.component';
import {ProfileComponent} from './Components/profile/profile.component';
import {AboutComponent} from './Components/about/about.component';
import {PackagesComponent} from './Components/package/packages/packagesview.component';
import {EventViewComponent} from './Components/event/eventoverview.component';
import {CustomPackageComponent} from './Components/package/packages/custom-package/custom-form/custom-package.component';
import {ActivitiesComponent} from './Components/activities/activities.component';
import {FoodComponent} from './Components/food/food.component';
import {AccomodationComponent} from './Components/accomodation/accomodation.component';
import {ContactComponent} from './Components/contact/contact.component';
import {ShoppingCartComponent} from './Components/shoppingCart/shoppingCart.component';


/*
app routes
  add new routes here
  default route will be localhost:3000/ which will redirect to localhost:3000/home
  the home component contains the first view that the user will see, and then the user can navigate elsewhere, such as
  packages
*/
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventViewComponent},
  { path: 'packages', component: PackagesComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'createpackage', component: CustomPackageComponent},
  { path: 'activities', component: ActivitiesComponent},
  { path: 'food', component: FoodComponent},
  { path: 'accomodation', component: AccomodationComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}

]

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)