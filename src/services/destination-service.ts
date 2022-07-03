import { Drink, Restaurant, Event, Sleep, City, Event2, Hotel } from "../types"
import { API_URL } from "../constantes"

export type DiscoveryResponse = {
    city: City
    drink: Drink[]
    enjoy: Event[]
    restaurant: Restaurant[]
    sleep: Sleep[]
    hotels: Hotel[],
    events: Event2[],
}

export async function discover(city: string): Promise<DiscoveryResponse> {
    const res = await fetch(API_URL + "/discover/" + city + "?count=10")
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json() as DiscoveryResponse
    data.events = data.events.map<Event>((e:any) => {
        return {
            name:e.title,
            location: {
                lat: e.lat,
                lng: e.lng
            },
            photos: [e.thumbnail],
            rating: e.venue.rating,
            reference: encodeURIComponent(e.title),
            types: ["events"],
            totalRatings: e.venue.reviews,
            address: e.address.join(', '),
            link: e.link,
            isGoogle: false
        }
    })
    data.sleep = data.hotels.map<Sleep>((e:any) => {
        return {
            name:e.hotel_name_trans,
            location: {
                lat: e.latitude,
                lng: e.longitude
            },
            photos: [e.main_photo_url],
            rating: e.review_score,
            reference: e.id,
            types: ["lodging"],
            totalRatings: e.review_nr,
            address: [e.address_trans,e.city_trans, e.country_trans].join(', '),
            link: e.url,
            isGoogle: false
        }
    })
    return data
}
