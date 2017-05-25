import {Injectable} from '@angular/core';

import {EventList} from '../../Objects/Event/EventList';
import {EVENT_LIST} from '../../Objects/Event/MockData/mock-event';



@Injectable()
export class EventService {
    getEvents() {
        return Promise.resolve(EVENT_LIST);
    }

    constructor() {}
 
}