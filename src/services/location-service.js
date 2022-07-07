/**
 * It takes an address as a string, and returns a promise that resolves to an object with a lat and lng
 * property
 * @param address - The address you want to get the coordinates for.
 * @returns An object with the latitude and longitude of the address.
 */
export const getLocation = async (address) => {
    return await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`).then(async res => {
        let response = await res.json()
        return {lat: parseFloat(response?.[0]?.lat), lng: parseFloat(response?.[0]?.lon)}
    })
}