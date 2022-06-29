import { Drink, Restaurant, Event, Sleep, City } from "../types"
import { API_URL } from "../constantes"

export type DiscoveryResponse = {
    city: City
    drink: Drink[]
    enjoy: Event[]
    restaurant: Restaurant[]
    sleep: Sleep[]
}

export async function discover(city: string): Promise<DiscoveryResponse> {
    const res = await fetch(API_URL + "/discover/" + city + "?count=10")
    if (!res.ok) throw new Error(res.statusText)
    return res.json() as Promise<DiscoveryResponse>
}
