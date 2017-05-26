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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var date_fns_1 = require("date-fns");
var colours_1 = require("./colours/colours");
var EventViewComponent = (function () {
    function EventViewComponent(http) {
        this.http = http;
        this.view = 'month';
        this.viewDate = new Date();
        this.activeDayIsOpen = false;
    }
    EventViewComponent.prototype.ngOnInit = function () {
        this.fetchEvents();
    };
    EventViewComponent.prototype.fetchEvents = function () {
        var getStart = {
            month: date_fns_1.startOfMonth,
            week: date_fns_1.startOfWeek,
            day: date_fns_1.startOfDay
        }[this.view];
        var getEnd = {
            month: date_fns_1.endOfMonth,
            week: date_fns_1.endOfWeek,
            day: date_fns_1.endOfDay
        }[this.view];
        var search = new http_1.URLSearchParams();
        search.set('primary_release_date.gte', date_fns_1.format(getStart(this.viewDate), 'YYYY-MM-DD'));
        search.set('primary_release_date.lte', date_fns_1.format(getEnd(this.viewDate), 'YYYY-MM-DD'));
        search.set('api_key', '0ec33936a68018857d727958dca1424f');
        this.events$ = this.http
            .get('https://api.themoviedb.org/3/discover/movie', { search: search })
            .map(function (res) { return res.json(); })
            .map(function (_a) {
            var results = _a.results;
            return results.map(function (film) {
                return {
                    title: film.title,
                    start: new Date(film.release_date),
                    color: colours_1.colours.yellow,
                    film: film
                };
            });
        });
    };
    EventViewComponent.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (date_fns_1.isSameMonth(date, this.viewDate)) {
            if ((date_fns_1.isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    };
    EventViewComponent.prototype.eventClicked = function (event) {
        window.open("https://www.themoviedb.org/movie/" + event.film.id, '_blank');
    };
    return EventViewComponent;
}());
EventViewComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'eventview',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        templateUrl: 'eventoverview.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], EventViewComponent);
exports.EventViewComponent = EventViewComponent;
//# sourceMappingURL=eventoverview.component.js.map