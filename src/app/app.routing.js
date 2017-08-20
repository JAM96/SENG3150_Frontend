"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var can_deactivate_guard_service_1 = require("./Components/guards/can-deactivate-guard.service");
var home_component_1 = require("./Components/home/home.component");
var profile_component_1 = require("./Components/profile/profile.component");
var viewPackages_component_1 = require("./Components/profile/viewPackages/viewPackages.component");
var viewVouchers_component_1 = require("./Components/profile/viewVouchers/viewVouchers.component");
var leaveFeedback_component_1 = require("./Components/profile/leaveFeedback/leaveFeedback.component");
var packagesview_component_1 = require("./Components/package/packages/packagesview.component");
var eventoverview_component_1 = require("./Components/event/eventoverview.component");
var custom_package_component_1 = require("./Components/package/packages/custom-package/custom-form/custom-package.component");
var activity_component_1 = require("./Components/activities/activity.component");
var food_and_drinks_component_1 = require("./Components/food-and-drinks/food-and-drinks.component");
var accomodation_component_1 = require("./Components/accomodation/accomodation.component");
var contact_component_1 = require("./Components/contact/contact.component");
var shoppingCart_component_1 = require("./Components/shoppingCart/shoppingCart.component");
var admin_component_1 = require("./Components/admin/admin.component");
var createAccommodation_component_1 = require("./Components/admin/create/accommodation/createAccommodation.component");
//test component
var test_component_1 = require("./Components/test-component/test.component");
/*
app routes
  add new routes here
  default route will be localhost:3000/ which will redirect to localhost:3000/home
  the home component contains the first view that the user will see, and then the user can navigate elsewhere, such as
  packages
*/
var appRoutes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'events', component: eventoverview_component_1.EventViewComponent },
    { path: 'packages', component: packagesview_component_1.PackagesComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'profile/viewPackages', component: viewPackages_component_1.ViewPackagesComponent },
    { path: 'profile/viewVouchers', component: viewVouchers_component_1.ViewVouchersComponent },
    { path: 'profile/leaveFeedback', component: leaveFeedback_component_1.LeaveFeedbackComponent },
    {
        path: 'createpackage',
        component: custom_package_component_1.CustomPackageComponent,
        canDeactivate: [can_deactivate_guard_service_1.CanDeactivateGuard],
    },
    { path: 'activities', component: activity_component_1.ActivityComponent },
    { path: 'food-and-drinks', component: food_and_drinks_component_1.FoodAndDrinksComponent },
    { path: 'accommodation', component: accomodation_component_1.AccomodationComponent },
    { path: 'contact', component: contact_component_1.ContactComponent },
    { path: 'shoppingCart', component: shoppingCart_component_1.ShoppingCartComponent },
    { path: 'test', component: test_component_1.TestComponent },
    { path: 'admin', component: admin_component_1.AdminComponent },
    { path: 'createAccommodation', component: createAccommodation_component_1.CreateAccommodationComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map