import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Contact} from "./contact";

@Component({
    selector: 'contact',
    template: `
    <hr>
    <div>
        <label for="firstname">First Name:</label>
        <input [(ngModel)]="contact.firstName" type="text" id="firstname">
    </div>
    <div>
        <label for="lastname">Last Name:</label>
        <input [(ngModel)]="contact.lastName" type="text" id="lastname">
    </div>
    <div>
        <label for="phone">Phone:</label>
        <input [(ngModel)]="contact.phone" type="text" id="phone">
    </div>
    <div>
        <label for="email">E-Mail:</label>
        <input [(ngModel)]="contact.email" type="text" id="email">
    </div>

    <button (click)="onCreateNew()">Create new Contact</button>
    `,
    inputs: ["contact"],
    styles: [`
        label {
            display: inline-block;
            width: 100px;
        }

        input {
            width: 250px;
            border: 1px solid #333333;
            border-left: 4px solid #233dcb;
            padding-left: 10px;
        }
    `]
})

export class ContactComponent{
    public contact: Contact = null;

    constructor(private _router: Router) {};

    onCreateNew() {
        this._router.navigate(['NewContactFromContact', {lastName: this.contact.lastName}])
    }
}