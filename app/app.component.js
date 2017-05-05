System.register(['angular2/core', "angular2/router", "./services/getemployee.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, getemployee_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (getemployee_service_1_1) {
                getemployee_service_1 = getemployee_service_1_1;
            }],
        execute: function() {
            /*
            import {HTTPTestComponent} from "./http-test.component";
            
            import {Http} from "angular2/http";
            import 'rxjs/add/operator/toPromise';
            */
            AppComponent = (function () {
                // Constructor with injected service
                function AppComponent(employeeService) {
                    this.employeeService = employeeService;
                }
                // Input properties
                // @Input() listId: string;
                // @Input() editId: string;
                AppComponent.prototype.loadEmployees = function () {
                    var _this = this;
                    // Get all comments
                    this.employeeService.getEmployee()
                        .subscribe(function (employee) { return _this.employees = employee; }, //Bind to view
                    function (//Bind to view
                        err) {
                        // Log errors if any
                        console.log(err);
                    });
                    //console.log(this.employees[0].id);
                };
                AppComponent.prototype.ngOnInit = function () {
                    // Load comments
                    this.loadEmployees();
                };
                AppComponent.prototype.ngOnChanges = function (changes) {
                    // Listen to the 'list'emitted event so as populate the model
                    // with the event payload
                    //EmitterService.get(this.listId).subscribe((employees:Employee[]) => {this.loadEmployees()});
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    <header>\n      <h1>List of employees</h1>\n      <ol>\n        <li *ngFor=\"#e of employees\">ID: {{e.id}}, Name: {{e.name}} {{e.lastName}}</li>\n      </ol>\n      <!-- router example<nav>\n        <a [routerLink]=\"['Contacts']\">Contacts</a>\n        <a [routerLink]=\"['NewContact']\">New Contact</a>\n      </nav> -->\n    </header>\n    <div>\n      <router-outlet></router-outlet>\n    </div>\n  ",
                        providers: [getemployee_service_1.EmployeeService]
                    }),
                    router_1.RouteConfig([]), 
                    __metadata('design:paramtypes', [getemployee_service_1.EmployeeService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
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
//# sourceMappingURL=app.component.js.map