/*
    Name: error.component.ts
    Date Created: 30/08/17
    Description: Abouts the error provided by the params
*/
import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'error',
    templateUrl: 'error.component.html'
})

export class ErrorComponent{
    @Input() type : string;

    errorMessage : string = "";

    constructor(private router : Router) {
        var currentRoute = router.url;
        console.log(currentRoute);

        if(currentRoute == "/error/ERR_CONNECTION_REFUSED") {
            this.errorMessage = "There has been a problem retrieving data from the database. Likely cause is no connection between you and the server."
        } 
    }
}