export type Coordinates = {
    lat: number
    lng: number
}

export type Item = {
    location: Coordinates
    name: string
    photos?: string[]
    rating: number
    reference: string
    types: string[]
    totalRatings: number
    address: string
    link?: string
    isGoogle?: boolean
}
export type Drink = Item
export type Event = Item
export type Travel = Item
export type Sleep = Item
export type Restaurant = Item
export type Hotel = Item
export type Event2 = Item

export type City = {
    photo: string
    location: Coordinates
    name: string
    address: string
    utc_offset: number
    ref: string
}
