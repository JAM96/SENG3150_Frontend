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
var packages_service_1 = require("../../../Services/package/packages.service");
var PackagesComponent = (function () {
    function PackagesComponent(route, _packagesService) {
        this.route = route;
        this._packagesService = _packagesService;
        this.minDate = new Date();
        this.guests = 0;
    }
    PackagesComponent.prototype.getPackages = function () {
        var _this = this;
        this._packagesService.getPackages().then(function (packages) { return _this.packages = packages; });
    };
    PackagesComponent.prototype.increaseGuests = function () {
        this.guests = this.guests + 1;
    };
    PackagesComponent.prototype.decreaseGuests = function () {
        if (this.guests != 0) {
            this.guests = this.guests - 1;
        }
    };
    PackagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getPackages();
        this.sub = this.route.params.subscribe(function (params) {
            _this.startDate = params['startDate'];
            _this.endDate = params['endDate'];
            _this.category = params['category'];
        });
    };
    return PackagesComponent;
}());
PackagesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'packages',
        templateUrl: 'packagesview.component.html',
        providers: [packages_service_1.PackagesService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, packages_service_1.PackagesService])
], PackagesComponent);
exports.PackagesComponent = PackagesComponent;
//# sourceMappingURL=packagesview.component.js.map