import {Component} from "@angular/core";
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'navigationtop',
    templateUrl: 'navigationtop.component.html'
})

export class NavigationTopComponent {
    constructor(public dialog: MdDialog){}
    isOpen : boolean = false;
    openDialog(){
        
        if(this.isOpen == false) {
            let dialogRef = this.dialog.open(LoginPopupComponent);
            this.isOpen = true;
            
            dialogRef.afterClosed().subscribe(result => {
            this.isOpen=false;
            })
        }
        
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