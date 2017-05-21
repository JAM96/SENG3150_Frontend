import {Component, Input} from '@angular/core'

import {PackageCategoryComponent} from '../packagecategory.component';

@Component({
    moduleId: module.id,
    selector: 'packages',
    templateUrl: 'packagesview.component.html'
})

export class PackagesComponent {
    @Input('startDate') startDate: Date;
    @Input('endDate') endDate: Date;
    @Input('category') category: string;

    guests = 0;
}