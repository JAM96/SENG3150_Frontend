import { Component } from 'angular2/core';
import {ContactListComponent} from "./contacts/contact-list.component";
import {NewContactComponent} from "./contacts/new-contact.component";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RouteConfig} from "angular2/router";
import {HTTPTestComponent} from "./http-test.component";

@Component({
  selector: 'my-app',
  template: `
    <header>
      <nav>
        <a [routerLink]="['Contacts']">Contacts</a>
        <a [routerLink]="['NewContact']">New Contact</a>
      </nav>
    </header>
    <div>
      <router-outlet></router-outlet>
      <http-test></http-test>
    </div>
  `,
  directives: [HTTPTestComponent, ContactListComponent, ROUTER_DIRECTIVES]
})

@RouteConfig([
  {path: '/contacts', name: 'Contacts', component: ContactListComponent, useAsDefault: true},
  {path: '/newcontact', name: 'NewContact', component: NewContactComponent, useAsDefault: false},
  {path: '/newcontact/:lastName', name: 'NewContactFromContact', component: NewContactComponent, useAsDefault: false},
])

export class AppComponent  { }
