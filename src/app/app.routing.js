"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./Components/home/home.component");
var profile_component_1 = require("./Components/profile/profile.component");
var packagesview_component_1 = require("./Components/package/packages/packagesview.component");
var eventoverview_component_1 = require("./Components/event/eventoverview.component");
var custom_package_component_1 = require("./Components/package/packages/custom-package/custom-form/custom-package.component");
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
    { path: 'createpackage', component: custom_package_component_1.CustomPackageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map