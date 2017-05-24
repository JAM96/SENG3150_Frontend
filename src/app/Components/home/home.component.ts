import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    scrollValue : number = 0;

    contentScroll(){
        alert('this works!');
        this.scrollValue + 1;
        console.log(this.scrollValue);
    }
}