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
//providers
var http_1 = require("@angular/http");
//used for Auth0
var app_routing_1 = require("../app.routing");
//Used for navigation
var router_1 = require("@angular/router");
//some tutorial code, probs not needed, *update* formsmodule is needed
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
var home_component_1 = require("../Components/home/home.component");
//Navigation Pages
var about_component_1 = require("../Components/about/about.component");
var eventoverview_component_1 = require("../Components/event/eventoverview.component");
var activities_component_1 = require("../Components/activities/activities.component");
var food_component_1 = require("../Components/food/food.component");
var accomodation_component_1 = require("../Components/accomodation/accomodation.component");
var contact_component_1 = require("../Components/contact/contact.component");
var shoppingCart_component_1 = require("../Components/shoppingCart/shoppingCart.component");
var create_custom_package_component_1 = require("../Components/package/packages/custom-package/custom-initial-form/create-custom-package.component");
var navigationtop_component_1 = require("../Components/navigation/navigationtop/navigationtop.component");
//Profile Component and Profile Components
var profile_component_1 = require("../Components/profile/profile.component");
var viewPackages_component_1 = require("../Components/profile/viewPackages/viewPackages.component");
var viewVouchers_component_1 = require("../Components/profile/viewVouchers/viewVouchers.component");
var leaveFeedback_component_1 = require("../Components/profile/leaveFeedback/leaveFeedback.component");
//packages components
var custom_package_component_1 = require("../Components/package/packages/custom-package/custom-form/custom-package.component");
var packagecategory_component_1 = require("../Components/package/packagecategory.component");
var packagesview_component_1 = require("../Components/package/packages/packagesview.component");
//import services here
//ng2 
var ng2_aside_1 = require("ng2-aside");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
//calendar
//test component
var test_component_1 = require("../Components/test-component/test.component");
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
            http_1.HttpModule,
            material_1.MaterialModule,
            material_1.MdDatepickerModule,
            material_1.MdNativeDateModule,
            animations_1.BrowserAnimationsModule,
            forms_1.FormsModule,
            md2_1.Md2Module.forRoot(),
            forms_1.ReactiveFormsModule,
            app_routing_1.routing,
            ng2_aside_1.AsideModule,
            ng2_slim_loading_bar_1.SlimLoadingBarModule.forRoot(),
        ],
        declarations: [
            app_component_1.AppComponent,
            test_component_1.TestComponent,
            home_component_1.HomeComponent,
            about_component_1.AboutComponent,
            activities_component_1.ActivitiesComponent,
            create_custom_package_component_1.CreateCustomPackageInitialComponent,
            navigationtop_component_1.NavigationTopComponent,
            navigationtop_component_1.LoginPopupComponent,
            navigationtop_component_1.notificationsPopupComponent,
            eventoverview_component_1.EventViewComponent,
            packagecategory_component_1.PackageCategoryComponentDialog,
            packagecategory_component_1.PackageCategoryComponent,
            packagesview_component_1.PackagesComponent,
            profile_component_1.ProfileComponent,
            custom_package_component_1.CustomPackageComponent,
            food_component_1.FoodComponent,
            accomodation_component_1.AccomodationComponent,
            contact_component_1.ContactComponent,
            shoppingCart_component_1.ShoppingCartComponent,
            viewPackages_component_1.ViewPackagesComponent,
            viewVouchers_component_1.ViewVouchersComponent,
            leaveFeedback_component_1.LeaveFeedbackComponent
        ],
        bootstrap: [app_component_1.AppComponent, packagecategory_component_1.PackageCategoryComponentDialog, navigationtop_component_1.LoginPopupComponent, navigationtop_component_1.notificationsPopupComponent],
        providers: [
            app_routing_1.appRoutingProviders,
        ]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map