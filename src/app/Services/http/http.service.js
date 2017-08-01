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
require("rxjs/add/operator/map");
var http_1 = require("@angular/http");
var HttpService = (function () {
    //Injecting the Http service:
    function HttpService(_http) {
        this._http = _http;
        //URL which handles JSON encoded data (I'm not sure how to use this. Maybe the localhost URL of the backend server.):
        this._url = "http://example.com";
    }
    HttpService.prototype.sendData = function (data) {
        //Convert the passed in data into a JSON string:
        var encoded_data = JSON.stringify({ data: data });
        var headers = new http_1.Headers({ 'Content-type': 'application/json;charset=utf-8' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(encoded_data, this._url, options).map(function (res) { return res.json() || {}; });
    };
    HttpService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map