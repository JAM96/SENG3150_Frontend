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
var activities_service_1 = require("../../Services/activities/activities.service");
var ActivitiesComponent = (function () {
    function ActivitiesComponent(activityService) {
        this.activityService = activityService;
    }
    ActivitiesComponent.prototype.getActivities = function () {
        var _this = this;
        this.activityService.getMockActivities().then(function (activity) { return _this.activity = activity; });
        /*
        console.log('retrieving food');
        
       
        this.activityService.getActivities()
            .subscribe((activity : ActivityList[]) => this.activity = activity);
        */
    };
    return ActivitiesComponent;
}());
ActivitiesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'activities',
        templateUrl: 'activities.component.html',
        providers: [activities_service_1.ActivityService]
    }),
    __metadata("design:paramtypes", [activities_service_1.ActivityService])
], ActivitiesComponent);
exports.ActivitiesComponent = ActivitiesComponent;
//# sourceMappingURL=activities.component.js.map