"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var app_component_1 = require("../Components/app.component");
//import components here
var about_component_1 = require("../Components/about/about.component");
var navigation_component_1 = require("../Components/navigation/navigation/navigation.component");
var navigationtop_component_1 = require("../Components/navigation/navigationtop/navigationtop.component");
var eventoverview_component_1 = require("../Components/event/eventoverview.component");
//packages
var packagecategory_component_1 = require("../Components/package/packagecategory.component");
var packagesview_component_1 = require("../Components/package/packages/packagesview.component");
var packagesview_component_2 = require("../Components/package/packages/packagesview.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot([
                {
                    path: 'packages',
                    component: packagecategory_component_1.PackageCategoryComponent,
                },
                {
                    path: 'packages\thrill',
                    component: packagesview_component_1.PackageThrillComponent
                },
                {
                    path: 'packages\relax',
                    component: packagesview_component_2.PackageRelaxComponent
                }
            ]),
        ],
        declarations: [
            app_component_1.AppComponent,
            about_component_1.AboutComponent,
            navigation_component_1.NavigationComponent,
            navigationtop_component_1.NavigationTopComponent,
            eventoverview_component_1.EventViewComponent,
            packagecategory_component_1.PackageCategoryComponent,
            packagesview_component_1.PackageThrillComponent,
            packagesview_component_2.PackageRelaxComponent,
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map