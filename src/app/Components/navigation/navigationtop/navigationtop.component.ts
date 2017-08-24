import {Component, Input, OnInit} from "@angular/core";
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router} from '@angular/router'

import {AuthService} from '../../../auth/auth.service';

@Component({
    moduleId: module.id,
    selector: 'navigationtop',
    templateUrl: 'navigationtop.component.html',
})

export class NavigationTopComponent implements OnInit{
    profile : any;
    selectedOption : number = 1;
    isOpen : boolean = false;

    constructor(
        public dialog: MdDialog, 
        public router: Router,
        public auth : AuthService,
    ) {
        auth.handleAuthentication();
    }

    ngOnInit() {
        // if(this.auth.isAuthenticated) {
        //     if (this.auth.userProfile) {
        //         this.profile = this.auth.userProfile;
        //     } else {
        //         this.auth.getProfile((err, profile) => {
        //             this.profile = profile;
        //         });
        //     }
        // }
    }

    setNavOption(selection : number) {
        this.selectedOption = selection;

        switch(this.selectedOption) {
            case 1: this.router.navigate(['/home']);            break;
            case 2: this.router.navigate(['/packages']);        break; 
            case 3: this.router.navigate(['/events']);          break;
            case 4: this.router.navigate(['/activities']);      break;
            case 5: this.router.navigate(['/food']);            break;
            case 6: this.router.navigate(['/accommodation']);   break;
            case 7: this.router.navigate(['/contact']);         break;
        }
    }


    openNotifications(){
        if(this.isOpen == false) {
            
            
            let dialogRef = this.dialog.open(notificationsPopupComponent);
            this.isOpen = true;
            
            dialogRef.afterClosed().subscribe(result => {
                this.isOpen=false;
                
            })
        
        }
        
    }
}

@Component({
    moduleId: module.id,
    selector: 'notificationsPopupComponent',
    templateUrl: 'notificationsPopup.component.html'
})
export class notificationsPopupComponent{
    constructor (public dialogRef: MdDialogRef<notificationsPopupComponent>) {}
}