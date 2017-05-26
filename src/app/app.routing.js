"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./Components/home/home.component");
var profile_component_1 = require("./Components/profile/profile.component");
var viewPackages_component_1 = require("./Components/profile/viewPackages/viewPackages.component");
var viewVouchers_component_1 = require("./Components/profile/viewVouchers/viewVouchers.component");
var leaveFeedback_component_1 = require("./Components/profile/leaveFeedback/leaveFeedback.component");
var packagesview_component_1 = require("./Components/package/packages/packagesview.component");
var eventoverview_component_1 = require("./Components/event/eventoverview.component");
var custom_package_component_1 = require("./Components/package/packages/custom-package/custom-form/custom-package.component");
var activities_component_1 = require("./Components/activities/activities.component");
var food_component_1 = require("./Components/food/food.component");
var accomodation_component_1 = require("./Components/accomodation/accomodation.component");
var contact_component_1 = require("./Components/contact/contact.component");
var shoppingCart_component_1 = require("./Components/shoppingCart/shoppingCart.component");
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
    { path: 'createpackage', component: custom_package_component_1.CustomPackageComponent },
    { path: 'activities', component: activities_component_1.ActivitiesComponent },
    { path: 'food', component: food_component_1.FoodComponent },
    { path: 'accomodation', component: accomodation_component_1.AccomodationComponent },
    { path: 'contact', component: contact_component_1.ContactComponent },
    { path: 'shoppingCart', component: shoppingCart_component_1.ShoppingCartComponent },
    { path: 'test', component: test_component_1.TestComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map