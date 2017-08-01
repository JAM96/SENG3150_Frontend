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
var router_1 = require("@angular/router");
var CreateAccommodationFeatureComponent = (function () {
    function CreateAccommodationFeatureComponent(router) {
        this.router = router;
        //This is the number which represents the page that the user wants to go to next.
        //Set to 0 (ie. back to the admin panel starting page), by default.
        this.selectedOption = 0;
    }
    CreateAccommodationFeatureComponent.prototype.setNavOption = function (selection) {
        this.selectedOption = selection;
        switch (this.selectedOption) {
            case 0:
                this.router.navigate(['/admin']);
                break;
        }
    };
    CreateAccommodationFeatureComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'createAccommodationFeature',
            templateUrl: 'createAccommodationFeature.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], CreateAccommodationFeatureComponent);
    return CreateAccommodationFeatureComponent;
}());
exports.CreateAccommodationFeatureComponent = CreateAccommodationFeatureComponent;
//# sourceMappingURL=createAccommodationFeature.component.js.map