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
//import services
var individual_activity_service_1 = require("../../Services/Activity/individual-activity.service");
var ActivityComponent = (function () {
    function ActivityComponent(ActivityService, dialogRef) {
        this.ActivityService = ActivityService;
        this.dialogRef = dialogRef;
    }
    ActivityComponent.prototype.ngOnInit = function () {
        this.Activity = Object.assign({}, this.ActivityService.getActivity());
        console.log("Activity is loaded: " + this.Activity.name);
    };
    return ActivityComponent;
}());
ActivityComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'activity',
        templateUrl: 'activity.component.html',
        styles: [],
    }),
    __metadata("design:paramtypes", [individual_activity_service_1.IndividualActivityService,
        material_1.MdDialogRef])
], ActivityComponent);
exports.ActivityComponent = ActivityComponent;
//# sourceMappingURL=activity.component.js.map