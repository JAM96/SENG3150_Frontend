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
//google maps
var core_2 = require("@agm/core");
//used for the material module (popups)
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
//used for the calendar popup
var md2_1 = require("md2");
var mydaterangepicker_1 = require("mydaterangepicker");
//import app
var app_component_1 = require("../Components/app.component");
//import components here
var home_component_1 = require("../Components/home/home.component");
//Navigation Pages
var about_component_1 = require("../Components/about/about.component");
var eventoverview_component_1 = require("../Components/event/eventoverview.component");
var activity_component_1 = require("../Components/activities/activity.component");
var food_and_drinks_component_1 = require("../Components/food-and-drinks/food-and-drinks.component");
var accomodation_component_1 = require("../Components/accomodation/accomodation.component");
var contact_component_1 = require("../Components/contact/contact.component");
var shoppingCart_component_1 = require("../Components/shoppingCart/shoppingCart.component");
var admin_component_1 = require("../Components/admin/admin.component");
var createAccommodation_component_1 = require("../Components/admin/create/accommodation/createAccommodation.component");
var create_custom_package_component_1 = require("../Components/package/packages/custom-package/custom-initial-form/create-custom-package.component");
var navigationtop_component_1 = require("../Components/navigation/navigationtop/navigationtop.component");
//Profile Component and Profile Components
var profile_component_1 = require("../Components/profile/profile.component");
var viewPackages_component_1 = require("../Components/profile/viewPackages/viewPackages.component");
var viewVouchers_component_1 = require("../Components/profile/viewVouchers/viewVouchers.component");
var leaveFeedback_component_1 = require("../Components/profile/leaveFeedback/leaveFeedback.component");
//packages components
var custom_package_component_1 = require("../Components/package/packages/custom-package/custom-form/custom-package.component");
var custom_calendar_component_1 = require("../Components/package/packages/custom-package/custom-initial-form/custom-calendar/custom-calendar.component");
var calendar_truncate_pipe_1 = require("../Components/package/packages/custom-package/custom-initial-form/custom-calendar/calendar-truncate.pipe");
var packagecategory_component_1 = require("../Components/package/packagecategory.component");
var packagesview_component_1 = require("../Components/package/packages/packagesview.component");
//import services here
var can_deactivate_guard_service_1 = require("../Components/guards/can-deactivate-guard.service");
var data_service_1 = require("../Services/data.service");
var individual_accommodation_service_1 = require("../Services/Accommodation/individual-accommodation.service");
var individual_food_and_drinks_service_1 = require("../Services/FoodAndDrinks/individual-food-and-drinks.service");
var individual_activity_service_1 = require("../Services/Activity/individual-activity.service");
//ng2 
var ng2_aside_1 = require("ng2-aside");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
//calendar
//custom package service
var custom_package_service_1 = require("../Components/package/packages/custom-package/custom-package-service/custom-package.service");
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
                md2_1.Md2Module,
                forms_1.ReactiveFormsModule,
                app_routing_1.routing,
                ng2_aside_1.AsideModule,
                ng2_slim_loading_bar_1.SlimLoadingBarModule.forRoot(),
                mydaterangepicker_1.MyDateRangePickerModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyAMwjWTDQg0aVK9flKslyeB5wKBBCq46Cg'
                }),
            ],
            declarations: [
                app_component_1.AppComponent,
                test_component_1.TestComponent,
                home_component_1.HomeComponent,
                about_component_1.AboutComponent,
                activity_component_1.ActivityComponent,
                admin_component_1.AdminComponent,
                create_custom_package_component_1.CreateCustomPackageInitialComponent,
                createAccommodation_component_1.CreateAccommodationComponent,
                navigationtop_component_1.NavigationTopComponent,
                navigationtop_component_1.LoginPopupComponent,
                custom_package_component_1.BudgetChangeComponent,
                custom_package_component_1.AddAccommodationComponent,
                custom_package_component_1.AddFoodAndDrinksComponent,
                custom_package_component_1.AddActivityComponent,
                navigationtop_component_1.notificationsPopupComponent,
                eventoverview_component_1.EventViewComponent,
                packagecategory_component_1.PackageCategoryComponentDialog,
                packagecategory_component_1.PackageCategoryComponent,
                packagesview_component_1.PackagesComponent,
                profile_component_1.ProfileComponent,
                custom_package_component_1.CustomPackageComponent,
                food_and_drinks_component_1.FoodAndDrinksComponent,
                accomodation_component_1.AccomodationComponent,
                contact_component_1.ContactComponent,
                shoppingCart_component_1.ShoppingCartComponent,
                viewPackages_component_1.ViewPackagesComponent,
                viewVouchers_component_1.ViewVouchersComponent,
                leaveFeedback_component_1.LeaveFeedbackComponent,
                custom_calendar_component_1.CustomCalendarComponent,
                calendar_truncate_pipe_1.TruncatePipe
            ],
            bootstrap: [
                app_component_1.AppComponent,
                packagecategory_component_1.PackageCategoryComponentDialog,
                custom_package_component_1.BudgetChangeComponent,
                navigationtop_component_1.LoginPopupComponent,
                custom_package_component_1.AddAccommodationComponent,
                custom_package_component_1.AddFoodAndDrinksComponent,
                custom_package_component_1.AddActivityComponent,
                navigationtop_component_1.notificationsPopupComponent
            ],
            providers: [
                app_routing_1.appRoutingProviders,
                custom_package_service_1.CustomPackageService,
                individual_accommodation_service_1.IndividualAccommodationService,
                individual_food_and_drinks_service_1.IndividualFoodAndDrinksService,
                individual_activity_service_1.IndividualActivityService,
                data_service_1.DataService,
                can_deactivate_guard_service_1.CanDeactivateGuard,
            ]
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map