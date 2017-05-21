import { NgModule }      from '@angular/core';

//used for Auth0
import {routing, appRoutingProviders} from '../app.routing';
import {AUTH_PROVIDERS} from 'angular2-jwt';
//Used for navigation
import {RouterModule, Routes, Router, NavigationStart} from '@angular/router';

//some tutorial code, probs not needed
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//used for the material module (popups)
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';

//used for the calendar popup
import { Md2Module }  from 'md2';

//import app
import { AppComponent }  from '../Components/app.component';

//import components here
import {AboutComponent} from '../Components/about/about.component';
import {HomeComponent} from '../Components/home/home.component';
import {NavigationComponent} from '../Components/navigation/navigation/navigation.component';
import {NavigationTopComponent} from '../Components/navigation/navigationtop/navigationtop.component';
import {EventViewComponent} from '../Components/event/eventoverview.component';
import {ActivitiesComponent} from '../Components/activities/activities.component';
import {ProfileComponent} from '../Components/profile/profile.component';
//packages components
import {PackageCategoryComponent, PackageCategoryComponentDialog} from '../Components/package/packagecategory.component';
import {PackagesComponent} from '../Components/package/packages/packagesview.component';
//import services here


/*
app routes
  add new routes here
  default route will be localhost:3000/ which will redirect to localhost:3000/home
  the home component contains the first view that the user will see, and then the user can navigate elsewhere, such as
  packages
*/
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'packages', component: PackagesComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}

]

//add module imports and component declarations here...
@NgModule({
  imports:      [ 
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    Md2Module.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    routing
    ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ActivitiesComponent,
    NavigationComponent,
    NavigationTopComponent, 
    EventViewComponent,
    PackageCategoryComponentDialog,
    PackageCategoryComponent,
    PackagesComponent,
    ProfileComponent
    ],
  bootstrap:    [ AppComponent, PackageCategoryComponentDialog],
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
