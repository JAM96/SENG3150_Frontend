import {Component} from "angular2/core";
import {ContactService} from "./contact.service";
import {Contact} from "./contact";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {OnInit} from "angular2/core";
import {ControlGroup} from "angular2/common";
import {FormBuilder} from "angular2/common";
import {Validators} from "angular2/common";

@Component({
    template: `
    <form [ngFormModel]="myForm" (ngSubmit)="onSubmit(myForm.value)">
        <div>
            <label for="firstname">First Name:</label>
            <input type="text" id="firstname" 
            [ngFormControl]="myForm.controls['firstName']"
            >
            <span *ngIf="!myForm.controls['firstName'].valid">not valid</span>
        </div>
        <div>
            <label for="lastname">Last Name:</label>
            <input type="text" id="lastname"
            [ngFormControl]="myForm.controls['lastName']"
            >
        </div>
        <div>
            <label for="phone">Phone:</label>
            <input type="text" id="phone"
            [ngFormControl]="myForm.controls['phone']"
            >
        </div>
        <div>
            <label for="email">E-Mail:</label>
            <input type="text" id="email"
            [ngFormControl]="myForm.controls['email']"
            >
        </div>
        <button type="submit" [disabled]="!myForm.valid">Create Contact</button>
    </form>
    `,
    providers: [ContactService],
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

        .ng-invalid {
            border: 1px solid red;
        }
    `]
})

export class NewContactComponent implements onInit {
    myForm: ControlGroup;

    constructor(private _contactService: ContactService, private _router: Router, private _routeParams: RouteParams, private _formBuilder: FormBuilder) {}

    ngOnInit():any {
        this.myForm = this._formBuilder.group({
            'firstName': ['', Validators.required],
            'lastName': [this._routeParams.get('lastName'), Validators.required],
            'phone': ['', Validators.required],
            'email': ['', Validators.required]
        });
    }

    onSubmit(value) {
        this._contactService.insertContact(value);
        this._router.navigate(["Contacts"]);
    }
}