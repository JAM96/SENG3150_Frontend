import {Component} from '@angular/core';
import {HttpService} from '../../../Services/http/http.service';
import {HttpModule} from '@angular/http';
import {AuthService} from '../../../auth/auth.service';
import { NgxBarcodeModule } from 'ngx-barcode';

@Component({
    moduleId: module.id,
    selector: 'viewVouchers',
    templateUrl: 'viewVouchers.component.html',
})

export class ViewVouchersComponent {
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