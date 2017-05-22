import {Component} from '@angular/core';
@Component({
    moduleId: module.id,
    selector: 'profile',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent {
    constructor(){}
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
}