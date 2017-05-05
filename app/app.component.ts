import { Component, OnInit, OnChanges} from 'angular2/core';
//import {ContactListComponent} from "./contacts/contact-list.component";
//import {NewContactComponent} from "./contacts/new-contact.component";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RouteConfig} from "angular2/router";
import {EmployeeService} from "./services/getemployee.service";
import {Employee} from "./models/employee";
import {EmitterService} from "./services/emitter.service";
/*
import {HTTPTestComponent} from "./http-test.component";

import {Http} from "angular2/http";
import 'rxjs/add/operator/toPromise';
*/

@Component({
  selector: 'my-app',
  template: `
    <header>
      <h1>List of employees</h1>
      <ol>
        <li *ngFor="#e of employees">ID: {{e.id}}, Name: {{e.name}} {{e.lastName}}</li>
      </ol>
      <!-- router example<nav>
        <a [routerLink]="['Contacts']">Contacts</a>
        <a [routerLink]="['NewContact']">New Contact</a>
      </nav> -->
    </header>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  providers: [EmployeeService]
  //directives: [HTTPTestComponent, ContactListComponent, ROUTER_DIRECTIVES]
})

@RouteConfig([
  /*
  {path: '/contacts', name: 'Contacts', component: ContactListComponent, useAsDefault: true},
  {path: '/newcontact', name: 'NewContact', component: NewContactComponent, useAsDefault: false},
  {path: '/newcontact/:lastName', name: 'NewContactFromContact', component: NewContactComponent, useAsDefault: false}, */
])

export class AppComponent implements OnInit, OnChanges{
  // Constructor with injected service
    constructor(
        private employeeService: EmployeeService
        ){}
    // Local properties
    employees: Employee[];
    // Input properties
   // @Input() listId: string;
   // @Input() editId: string;

    loadEmployees(){
        // Get all comments
         this.employeeService.getEmployee()
                           .subscribe(
                               employee => this.employees = employee, //Bind to view
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });
      //console.log(this.employees[0].id);
    }

    ngOnInit(){
            // Load comments
            this.loadEmployees()
    }
    

    ngOnChanges(changes:any) {
        // Listen to the 'list'emitted event so as populate the model
        // with the event payload
        //EmitterService.get(this.listId).subscribe((employees:Employee[]) => {this.loadEmployees()});
    }
}

//{"id":"1","map":{"111":{"company":"ABC","id":111,"name":"Ram"},
//"111":{"company":"ABC","id":111,"name":"Ram"
//[{"id":1,"lastName":"ABC","name":"Ram"}

/* old
export class AppComponent implements OnInit {
  public data = [{
            id: 111}, {
            lastName : "smith"},{
            name : "john"}
        ];
        
    constructor(private http:Http) {
       
    }

    ngOnInit() {
      this.http.get("http://localhost:8080/getEmployee.action").
      toPromise().then(r => r.json()).then(r => this.data = r);

     
    }
 }*/


 //TUT
 //https://scotch.io/tutorials/angular-2-http-requests-with-observables
