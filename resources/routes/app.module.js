System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var appRoutes, AppModule;
    return {
        setters:[],
        execute: function() {
            appRoutes = [
                { path: 'crisis-center', component: CrisisListComponent },
                { path: 'hero/:id', component: HeroDetailComponent },
                {
                    path: 'heroes',
                    component: HeroListComponent,
                    data: { title: 'Heroes List' }
                },
                { path: '',
                    redirectTo: '/heroes.html',
                    pathMatch: 'full'
                },
                { path: '**', component: PageNotFoundComponent }
            ];
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    NgModule.apply(void 0, [{
                        imports: [
                            RouterModule.forRoot(appRoutes)
                        ], }].concat()), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    }
});
//# sourceMappingURL=app.module.js.map