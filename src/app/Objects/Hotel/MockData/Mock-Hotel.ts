import {Hotel} from '../Hotel';

export const HOTEL_LIST: Hotel[] = [
    {
        accommodationID: 'PI: 8232883',
        accommodationName: 'Ibis',
        accommodationAddress: '1 wentworth street',
        accommodationSuburb: 'Newcastle',
        accommodationStarRating: 3,
        accommodationUserRating: 4,
        numBeds: 2,
        numPeople: 3,
        pricePerNight: 80.0,
        bestSeller: false,
        accommodationType: 'motel',
        pictureURL: 'ibis.jpg'
    },
    {
        accommodationID: 'PI: 82342883',
        accommodationName: 'Crowne Plaza',
        accommodationAddress: '1 wentworth street',
        accommodationSuburb: 'Newcastle',
        accommodationStarRating: 5,
        accommodationUserRating: 5,
        numBeds: 3,
        numPeople: 6,
        pricePerNight: 380.0,
        bestSeller: false,
        accommodationType: 'Hotel',
        pictureURL: 'crowne.jpg'
    },
    {
        accommodationID: 'PI: 823238833',
        accommodationName: 'The Grand Hotel',
        accommodationAddress: '1 wentworth street',
        accommodationSuburb: 'Newcastle',
        accommodationStarRating: 4,
        accommodationUserRating: 5,
        numBeds: 2,
        numPeople: 4,
        pricePerNight: 180.0,
        bestSeller: true,
        accommodationType: 'Hotel',
        pictureURL: 'grand.jpg'
    }
]