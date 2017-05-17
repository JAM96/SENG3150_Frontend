import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from '../Components/app.component';

//import components here
import {AboutComponent} from '../Components/about/about.component';
import {NavigationComponent} from '../Components/navigation/navigation/navigation.component';
import {NavigationTopComponent} from '../Components/navigation/navigationtop/navigationtop.component';
import {EventView} from '../Components/event/eventoverview.component'

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [
    AppComponent,
    AboutComponent,
    NavigationComponent,
    NavigationTopComponent, 
    EventView,
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
