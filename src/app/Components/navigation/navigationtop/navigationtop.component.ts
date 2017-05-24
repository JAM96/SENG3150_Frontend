import {Component, Input} from "@angular/core";
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router} from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'navigationtop',
    templateUrl: 'navigationtop.component.html'
})

export class NavigationTopComponent {
    constructor(public dialog: MdDialog, public router: Router){}
    isOpen : boolean = false;
    isLogin : boolean = false;
    loginButtonText : String = 'Login';
    @Input ('user') username : String;
    
    openDialog(){
        if(this.loginButtonText=='Logout'){
            this.onLogout();
        }
        else if(this.isOpen == false) {
            
            
            let dialogRef = this.dialog.open(LoginPopupComponent);
            this.isOpen = true;
            
            dialogRef.afterClosed().subscribe(result => {
                this.isOpen=false;
                if (result=='true'){
                    this.updateUsername('BenDelore');
                    this.onLogin();
                }
            })
        
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