import {Component} from '@angular/core'

@Component({
    moduleId: module.id,
    selector: 'navigation',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent {
    guests: number = 0;
    rooms: number = 0;
    maxRooms: number = 10;
    maxGuests: number = 10;


    increaseGuests() {
        if(this.guests != this.maxGuests) {
            this.guests = this.guests + 1;
        }
    }

    decreaseGuests() {
        if(this.guests != 0) {
            this.guests = this.guests - 1;
        }
    }

    increaseRooms() {
        if(this.rooms != this.maxRooms) {
            this.rooms = this.rooms + 1;
        }
    }

    decreaseRooms() {
        if(this.rooms != 0) {
            this.rooms = this.rooms - 1;
        }
    }
}