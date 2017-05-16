import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {PopupModule} from 'ng2-opd-popup';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PopupModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
