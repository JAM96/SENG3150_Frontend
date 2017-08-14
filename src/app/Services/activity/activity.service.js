"use strict";
/*
 * SERVICE NAME: Activity
 * Role: Retrieving the activity data from the backend
 */
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
//Imports
var core_1 = require("@angular/core");
var mock_activity_1 = require("../../Objects/Activity/MockData/mock-activity");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var data_service_1 = require("../data.service");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
//end imports
var ActivityService = (function () {
    function ActivityService(http, data) {
        this.http = http;
        this.data = data;
    }
    ActivityService.prototype.getActivities = function () {
        var url = this.data.getApiUrl('activity');
        return this.http.get(url)
            .map(function (response) { return response.json().result; })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ActivityService.prototype.getMockActivities = function () {
        return Promise.resolve(mock_activity_1.ACTIVITY_LIST);
    };
    return ActivityService;
}());
ActivityService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, data_service_1.DataService])
], ActivityService);
exports.ActivityService = ActivityService;
//# sourceMappingURL=activity.service.js.map