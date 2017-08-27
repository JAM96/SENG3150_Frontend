import {Component} from '@angular/core';
import {AuthService} from '../../auth/auth.service';


@Component({
    moduleId: module.id,
    selector: 'profile',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent {
    profile : any;
    name : string;

    constructor(public auth: AuthService){
    }

    editText : String = "Edit";
    isEdit : boolean = false;
    onEdit(){
        if (this.isEdit==false){
            this.editText = "Save";
            this.isEdit = true;
        } else {
            this.editText = "Edit"
            this.isEdit = false;
        }
    }

    ngOnInit() {
        if (this.auth.userProfile) {
          this.profile = this.auth.userProfile;
        } else {
          this.auth.getProfile((err, profile) => {
            this.profile = profile;
          });
        }
      }
}