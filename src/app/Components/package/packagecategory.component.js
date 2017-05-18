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
var material_1 = require("@angular/material");
var PackageCategoryComponent = (function () {
    function PackageCategoryComponent(dialog) {
        this.dialog = dialog;
        this.startDate = new Date;
        this.endDate = new Date;
        this.nights = Math.ceil((Math.abs(this.endDate.getTime() - this.startDate.getTime()))
            / (1000 * 3600 * 24));
    }
    PackageCategoryComponent.prototype.ngOnInit = function () {
        if (this.startDate == null) {
            this.startDate = new Date;
        }
        if (this.endDate == null) {
            this.endDate = new Date;
        }
    };
    PackageCategoryComponent.prototype.openDateForm = function (category) {
        var _this = this;
        var dialogRef = this.dialog.open(PackageCategoryComponentDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            _this.selectedOption = result;
        });
    };
    return PackageCategoryComponent;
}());
PackageCategoryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'packages-category',
        templateUrl: 'packagecategory.component.html'
    }),
    __metadata("design:paramtypes", [material_1.MdDialog])
], PackageCategoryComponent);
exports.PackageCategoryComponent = PackageCategoryComponent;
var PackageCategoryComponentDialog = (function () {
    function PackageCategoryComponentDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return PackageCategoryComponentDialog;
}());
PackageCategoryComponentDialog = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'package-setdate',
        templateUrl: 'package-setdate.component.html',
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef])
], PackageCategoryComponentDialog);
exports.PackageCategoryComponentDialog = PackageCategoryComponentDialog;
//# sourceMappingURL=packagecategory.component.js.map