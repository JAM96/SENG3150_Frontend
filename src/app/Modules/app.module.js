"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//Used for navigation
var router_1 = require("@angular/router");
//some tutorial code, probs not needed
var forms_1 = require("@angular/forms");
//used for the material module (popups)
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
//used for the calendar popup
var md2_1 = require("md2");
//import app
var app_component_1 = require("../Components/app.component");
//import components here
var about_component_1 = require("../Components/about/about.component");
var home_component_1 = require("../Components/home/home.component");
var navigation_component_1 = require("../Components/navigation/navigation/navigation.component");
var navigationtop_component_1 = require("../Components/navigation/navigationtop/navigationtop.component");
var eventoverview_component_1 = require("../Components/event/eventoverview.component");
//packages components
var packagecategory_component_1 = require("../Components/package/packagecategory.component");
var packagesview_component_1 = require("../Components/package/packages/packagesview.component");
/*
app routes
  add new routes here
  default route will be localhost:3000/ which will redirect to localhost:3000/home
  the home component contains the first view that the user will see, and then the user can navigate elsewhere, such as
  packages
*/
var appRoutes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'packages', component: packagesview_component_1.PackagesComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
//add module imports and component declarations here...
var AppModule = (function () {
    function AppModule(router) {
        router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                console.log('router path:', event.url);
            }
        });
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            material_1.MaterialModule,
            animations_1.BrowserAnimationsModule,
            forms_1.FormsModule,
            md2_1.Md2Module.forRoot(),
            forms_1.ReactiveFormsModule,
            router_1.RouterModule.forRoot(appRoutes),
        ],
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            about_component_1.AboutComponent,
            navigation_component_1.NavigationComponent,
            navigationtop_component_1.NavigationTopComponent,
            eventoverview_component_1.EventViewComponent,
            packagecategory_component_1.PackageCategoryComponentDialog,
            packagecategory_component_1.PackageCategoryComponent,
            packagesview_component_1.PackagesComponent,
        ],
        bootstrap: [app_component_1.AppComponent, packagecategory_component_1.PackageCategoryComponentDialog]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map