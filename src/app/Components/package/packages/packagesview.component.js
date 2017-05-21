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
var PackagesComponent = (function () {
    function PackagesComponent() {
        this.guests = 0;
    }
    return PackagesComponent;
}());
__decorate([
    core_1.Input('startDate'),
    __metadata("design:type", Date)
], PackagesComponent.prototype, "startDate", void 0);
__decorate([
    core_1.Input('endDate'),
    __metadata("design:type", Date)
], PackagesComponent.prototype, "endDate", void 0);
__decorate([
    core_1.Input('category'),
    __metadata("design:type", String)
], PackagesComponent.prototype, "category", void 0);
PackagesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'packages',
        templateUrl: 'packagesview.component.html'
    })
], PackagesComponent);
exports.PackagesComponent = PackagesComponent;
//# sourceMappingURL=packagesview.component.js.map