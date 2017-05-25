"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CustomPackageComponent = (function () {
    function CustomPackageComponent() {
        this.selected = 3;
        this.days = [1, 2, 3, 4, 5];
        this.selectedDay = 3;
        //travel form
        this.travelSubmitted = false;
        this.travelValue = 'No';
        this.travelOptions = ['Yes', 'No'];
        //travel form
        this.accommodationValue = 'No';
        this.accommodationOptions = ['Yes', 'No'];
        //food form
        this.heightB = '0%';
        this.heightL = '0%';
        this.heightD = '0%';
        this.heightO = '0%';
        // setTravelValue(selection : boolean) {
        //     this.travelValue = selection;
        // }
    }
    CustomPackageComponent.prototype.ngOnInit = function () {
    };
    //Navigation
    CustomPackageComponent.prototype.prevForm = function () {
        if (this.selected != 1) {
            this.selected = this.selected - 1;
            console.info(this.selected);
        }
    };
    CustomPackageComponent.prototype.nextForm = function () {
        if (this.selected != 5) {
            this.selected = this.selected + 1;
            console.info(this.selected);
        }
    };
    CustomPackageComponent.prototype.setNavigation = function (selection) {
        this.selected = selection;
    };
    CustomPackageComponent.prototype.setDays = function (selection) {
        this.selectedDay = selection;
    };
    CustomPackageComponent.prototype.expandB = function () {
        if (this.heightB == '0%') {
            this.heightB = '80%';
        }
        else {
            this.heightB = '0%';
        }
    };
    CustomPackageComponent.prototype.expandL = function () {
        if (this.heightL == '0%') {
            this.heightL = '80%';
        }
        else {
            this.heightL = '0%';
        }
    };
    CustomPackageComponent.prototype.expandD = function () {
        if (this.heightD == '0%') {
            this.heightD = '80%';
        }
        else {
            this.heightD = '0%';
        }
    };
    CustomPackageComponent.prototype.expandO = function () {
        if (this.heightO == '0%') {
            this.heightO = '80%';
        }
        else {
            this.heightO = '0%';
        }
    };
    return CustomPackageComponent;
}());
CustomPackageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'custom-package',
        templateUrl: 'custom-package.component.html',
    })
], CustomPackageComponent);
exports.CustomPackageComponent = CustomPackageComponent;
//# sourceMappingURL=custom-package.component.js.map