import {Component, Input} from "@angular/core";
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router} from '@angular/router'

import {AuthService} from '../../../auth/auth.service';

@Component({
    moduleId: module.id,
    selector: 'navigationtop',
    templateUrl: 'navigationtop.component.html',
})

export class NavigationTopComponent {
    constructor(
        public dialog: MdDialog, 
        public router: Router,
        public auth : AuthService,
    ) {
        auth.handleAuthentication();
    }
    selectedOption : number = 1;

    isOpen : boolean = false;
    isLogin : boolean = false;
    loginButtonText : String = 'Login';
    @Input ('user') username : String;
    

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
            case 8: this.router.navigate(['/test']);            break;
        }
    }

    openDialog(){
       
        // if(this.loginButtonText=='Logout'){
        //     this.onLogout();
        // }
        // else if(this.isOpen == false) {
            
            
        //     let dialogRef = this.dialog.open(LoginPopupComponent);
        //     this.isOpen = true;
            
        //     dialogRef.afterClosed().subscribe(result => {
        //         this.isOpen=false;
        //         if (result=='true'){
        //             this.updateUsername('BenDelore');
        //             this.onLogin();
        //         }
        //     })
        
        // }
        
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

    onLogin(){
        this.isLogin = true;
        this.loginButtonText = 'Logout';

    }
    
    updateUsername(username : String){
        this.username = username;
    }

    onLogout(){
        this.isLogin = false;
        this.loginButtonText = 'Login'
        this.router.navigate(['/home']);
    }
    

}

@Component({
    moduleId: module.id,
    selector: 'loginPopupComponent',
    templateUrl: 'loginPopup.component.html'
})
export class LoginPopupComponent{
    constructor (public dialogRef: MdDialogRef<LoginPopupComponent>) {}
}

@Component({
    moduleId: module.id,
    selector: 'notificationsPopupComponent',
    templateUrl: 'notificationsPopup.component.html'
})
export class notificationsPopupComponent{
    constructor (public dialogRef: MdDialogRef<notificationsPopupComponent>) {}
}