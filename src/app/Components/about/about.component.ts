/*
    Name: about.component.ts
    Date Created: 17/05/17
    Description: Contains the code for the about component.
    Contains information about Newcastle and Newcastle Connections

    TODO: Add database link so the data can be changed whenever by an admin of the website.
    TODO: Add edit button when admin is logged in.
*/
import {Component} from '@angular/core'
import {DataService} from '../../Services/data.service'


@Component({
    moduleId: module.id,
    selector: 'about',
    templateUrl: 'about.component.html'
})

export class AboutComponent{
    //description will be linked to the database
    description = "Newcastle, Australia's seventh largest city, is only 160kms north of Sydney. It is located in the heart of the Hunter Region and is bordered by a stunning coastline with beautiful beaches. All within an hour's drive, Newcastle is ideally located to access amazing beaches in Newcastle and Port Stephens; world-class wineries in the Hunter Valley; a world-heritage listed rainforest, Barrington Tops; Australia's largest salt water lake, Lake Macquarie; and some of the world's most famous horse studs in the Upper Hunter. Easily accessible by air with several flights departing daily, rail, boat, interstate and local coach services. The City offers a range of local public transport services, as well as world class cycle ways and walking tracks. Newcastle's proximity to Sydney and surrounds makes it an easy getaway for a weekend or longer stay."
    constructor(public data : DataService) {
        data.setNavigation(7)
    }
}