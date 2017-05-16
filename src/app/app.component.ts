import { Component, ViewContainerRef } from '@angular/core';
import {Popup} from 'ng2-opd-popup';

import {Overlay} from 'angular2-modal'
import {Modal} from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';


  constructor(private popup:Popup, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  loginDialog2() {
    this.modal.alert()
    .title('Hello World')
    .body('In Angular 2')
    .open();
  }
  loginDialog() {
    this.popup.options = {
    header: "Login",
    color: "#333333", // red, blue.... 
    widthProsentage: 40, // The with of the popou measured by browser width 
    animationDuration: 1, // in seconds, 0 = no animation 
    showButtons: true, // You can hide this in case you want to use custom buttons 
    confirmBtnContent: "Login", // The text on your confirm button 
    cancleBtnContent: "Cancel", // the text on your cancel button 
    confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
    cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
    animation: "fadeInUp" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };
    this.popup.show();
  }
}
