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
var AdminComponent = (function () {
    function AdminComponent(router) {
        this.router = router;
        //This is the number which represents the page that the user wants to go to next.
        //Set to 0 (ie. back to the home page), by default.
        this.selectedOption = 0;
    }
    AdminComponent.prototype.setNavOption = function (selection) {
        this.selectedOption = selection;
        switch (this.selectedOption) {
            case 0:
                this.router.navigate(['/']);
                break;
            case 1:
                this.router.navigate(['/createAccommodation']);
                break;
            case 2:
                this.router.navigate(['/createPackage']);
                break;
            case 3:
                this.router.navigate(['/createActivity']);
                break;
            case 4:
                this.router.navigate(['/createEvent']);
                break;
            case 5:
                this.router.navigate(['/createFoodAndDrink']);
                break;
        }
    };
    AdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin',
            templateUrl: 'admin.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map