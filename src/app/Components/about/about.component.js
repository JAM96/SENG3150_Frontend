"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AboutComponent = (function () {
    function AboutComponent() {
        this.description = "Newcastle, Australia's seventh largest city, is only 160kms north of Sydney. It is located in the heart of the Hunter Region and is bordered by a stunning coastline with beautiful beaches. All within an hour's drive, Newcastle is ideally located to access amazing beaches in Newcastle and Port Stephens; world-class wineries in the Hunter Valley; a world-heritage listed rainforest, Barrington Tops; Australia's largest salt water lake, Lake Macquarie; and some of the world's most famous horse studs in the Upper Hunter. Easily accessible by air with several flights departing daily, rail, boat, interstate and local coach services. The City offers a range of local public transport services, as well as world class cycle ways and walking tracks. Newcastle's proximity to Sydney and surrounds makes it an easy getaway for a weekend or longer stay.";
    }
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'about',
        templateUrl: 'about.component.html'
    })
], AboutComponent);
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map