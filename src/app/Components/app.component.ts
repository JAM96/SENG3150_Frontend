import { Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(auth : AuthService) {
    auth.handleAuthentication();
  }
}
