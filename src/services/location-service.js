export const getLocation = async (address) => {
    return await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`).then(async res => {
        let response = await res.json()
        return {lat: parseFloat(response?.[0]?.lat), lng: parseFloat(response?.[0]?.lon)}
    })
}