import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './Components/home/home.component';
import {ProfileComponent} from './Components/profile/profile.component';

const appRoutes: Routes=[
{
    path:'',
    component: HomeComponent
},
{
    path: 'profile',
    component: ProfileComponent
}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)