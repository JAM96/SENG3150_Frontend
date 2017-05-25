import {Injectable} from '@angular/core';

import {FoodList} from '../../Objects/Food/FoodList';
import {FOOD_LIST} from '../../Objects/Food/MockData/mock-food';



@Injectable()
export class FoodService {
    getFood() {
        return Promise.resolve(FOOD_LIST);
    }

    constructor() {}
 
}