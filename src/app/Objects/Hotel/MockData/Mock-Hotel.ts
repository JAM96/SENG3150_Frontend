import {Hotel} from '../Hotel';

export const HOTEL_LIST: Hotel[] = [
    {
        accomodationID: 'PI: 8232883',
        accomodationName: 'Ibis',
        accomodationAddress: '1 wentworth street',
        accomodationCity: 'Newcastle',
        accomodationStarRating: 3,
        accomodationUserRating: 4,
        numBeds: 2,
        numPeople: 3,
        pricePerNight: 80.0,
        bestSeller: false,
        accomodationType: 'motel',
        pictureURL: 'ibis.jpg'
    },
    {
        accomodationID: 'PI: 82342883',
        accomodationName: 'Crowne Plaza',
        accomodationAddress: '1 wentworth street',
        accomodationCity: 'Newcastle',
        accomodationStarRating: 5,
        accomodationUserRating: 5,
        numBeds: 3,
        numPeople: 6,
        pricePerNight: 380.0,
        bestSeller: false,
        accomodationType: 'Hotel',
        pictureURL: 'crowne.jpg'
    },
    {
        accomodationID: 'PI: 823238833',
        accomodationName: 'The Grand Hotel',
        accomodationAddress: '1 wentworth street',
        accomodationCity: 'Newcastle',
        accomodationStarRating: 4,
        accomodationUserRating: 5,
        numBeds: 2,
        numPeople: 4,
        pricePerNight: 180.0,
        bestSeller: true,
        accomodationType: 'Hotel',
        pictureURL: 'grand.jpg'
    }
]