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
var router_1 = require("@angular/router");
var NavigationTopComponent = (function () {
    function NavigationTopComponent(dialog, router) {
        this.dialog = dialog;
        this.router = router;
        this.selectedOption = 1;
        this.isOpen = false;
        this.isLogin = false;
        this.loginButtonText = 'Login';
    }
    NavigationTopComponent.prototype.setNavOption = function (selection) {
        this.selectedOption = selection;
        switch (this.selectedOption) {
            case 1:
                this.router.navigate(['/home']);
                break;
            case 2:
                this.router.navigate(['/packages']);
                break;
            case 3:
                this.router.navigate(['/events']);
                break;
            case 4:
                this.router.navigate(['/activities']);
                break;
            case 5:
                this.router.navigate(['/food']);
                break;
            case 6:
                this.router.navigate(['/accommodation']);
                break;
            case 7:
                this.router.navigate(['/contact']);
                break;
            case 8:
                this.router.navigate(['/test']);
                break;
        }
    };
    NavigationTopComponent.prototype.openDialog = function () {
        var _this = this;
        if (this.loginButtonText == 'Logout') {
            this.onLogout();
        }
        else if (this.isOpen == false) {
            var dialogRef = this.dialog.open(LoginPopupComponent);
            this.isOpen = true;
            dialogRef.afterClosed().subscribe(function (result) {
                _this.isOpen = false;
                if (result == 'true') {
                    _this.updateUsername('BenDelore');
                    _this.onLogin();
                }
            });
        }
    };
    NavigationTopComponent.prototype.openNotifications = function () {
        var _this = this;
        if (this.isOpen == false) {
            var dialogRef = this.dialog.open(notificationsPopupComponent);
            this.isOpen = true;
            dialogRef.afterClosed().subscribe(function (result) {
                _this.isOpen = false;
            });
        }
    };
    NavigationTopComponent.prototype.onLogin = function () {
        this.isLogin = true;
        this.loginButtonText = 'Logout';
    };
    NavigationTopComponent.prototype.updateUsername = function (username) {
        this.username = username;
    };
    NavigationTopComponent.prototype.onLogout = function () {
        this.isLogin = false;
        this.loginButtonText = 'Login';
        this.router.navigate(['/home']);
    };
    __decorate([
        core_1.Input('user'),
        __metadata("design:type", String)
    ], NavigationTopComponent.prototype, "username", void 0);
    NavigationTopComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navigationtop',
            templateUrl: 'navigationtop.component.html'
        }),
        __metadata("design:paramtypes", [material_1.MdDialog, router_1.Router])
    ], NavigationTopComponent);
    return NavigationTopComponent;
}());
exports.NavigationTopComponent = NavigationTopComponent;
var LoginPopupComponent = (function () {
    function LoginPopupComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    LoginPopupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'loginPopupComponent',
            templateUrl: 'loginPopup.component.html'
        }),
        __metadata("design:paramtypes", [material_1.MdDialogRef])
    ], LoginPopupComponent);
    return LoginPopupComponent;
}());
exports.LoginPopupComponent = LoginPopupComponent;
var notificationsPopupComponent = (function () {
    function notificationsPopupComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    notificationsPopupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'notificationsPopupComponent',
            templateUrl: 'notificationsPopup.component.html'
        }),
        __metadata("design:paramtypes", [material_1.MdDialogRef])
    ], notificationsPopupComponent);
    return notificationsPopupComponent;
}());
exports.notificationsPopupComponent = notificationsPopupComponent;
//# sourceMappingURL=navigationtop.component.js.map