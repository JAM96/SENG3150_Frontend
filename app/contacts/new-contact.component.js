System.register(["angular2/core", "./contact.service", "angular2/router", "angular2/common"], function(exports_1, context_1) {
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
    var core_1, contact_service_1, router_1, router_2, common_1, common_2;
    var NewContactComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (contact_service_1_1) {
                contact_service_1 = contact_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
                common_2 = common_1_1;
            }],
        execute: function() {
            NewContactComponent = (function () {
                function NewContactComponent(_contactService, _router, _routeParams, _formBuilder) {
                    this._contactService = _contactService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._formBuilder = _formBuilder;
                }
                NewContactComponent.prototype.ngOnInit = function () {
                    this.myForm = this._formBuilder.group({
                        'firstName': ['', common_2.Validators.required],
                        'lastName': [this._routeParams.get('lastName'), common_2.Validators.required],
                        'phone': ['', common_2.Validators.required],
                        'email': ['', common_2.Validators.required]
                    });
                };
                NewContactComponent.prototype.onSubmit = function (value) {
                    this._contactService.insertContact(value);
                    this._router.navigate(["Contacts"]);
                };
                NewContactComponent = __decorate([
                    core_1.Component({
                        template: "\n    <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit(myForm.value)\">\n        <div>\n            <label for=\"firstname\">First Name:</label>\n            <input type=\"text\" id=\"firstname\" \n            [ngFormControl]=\"myForm.controls['firstName']\"\n            >\n            <span *ngIf=\"!myForm.controls['firstName'].valid\">not valid</span>\n        </div>\n        <div>\n            <label for=\"lastname\">Last Name:</label>\n            <input type=\"text\" id=\"lastname\"\n            [ngFormControl]=\"myForm.controls['lastName']\"\n            >\n        </div>\n        <div>\n            <label for=\"phone\">Phone:</label>\n            <input type=\"text\" id=\"phone\"\n            [ngFormControl]=\"myForm.controls['phone']\"\n            >\n        </div>\n        <div>\n            <label for=\"email\">E-Mail:</label>\n            <input type=\"text\" id=\"email\"\n            [ngFormControl]=\"myForm.controls['email']\"\n            >\n        </div>\n        <button type=\"submit\" [disabled]=\"!myForm.valid\">Create Contact</button>\n    </form>\n    ",
                        providers: [contact_service_1.ContactService],
                        styles: ["\n        label {\n            display: inline-block;\n            width: 100px;\n        }\n\n        input {\n            width: 250px;\n            border: 1px solid #333333;\n            border-left: 4px solid #233dcb;\n            padding-left: 10px;\n        }\n\n        .ng-invalid {\n            border: 1px solid red;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [contact_service_1.ContactService, router_1.Router, router_2.RouteParams, common_1.FormBuilder])
                ], NewContactComponent);
                return NewContactComponent;
            }());
            exports_1("NewContactComponent", NewContactComponent);
        }
    }
});
//# sourceMappingURL=new-contact.component.js.map