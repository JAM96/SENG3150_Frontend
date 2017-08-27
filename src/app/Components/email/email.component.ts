import { Component } from '@angular/core';
import {EmailService} from '../../Services/Email/email.service';

@Component({
  moduleId: module.id,
  selector: 'emailComponent',
  templateUrl: 'email.component.html',
  styleUrls: []
})
export class EmailComponent {
  newEmail = {
    email: '',
  }
  
  constructor(private email: EmailService) {}
  
  addUser() {
   this.email.sendEmail(this.newEmail);
  }
}