import "./trip.scss"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import "leaflet-routing-machine"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect } from "react"

const Trip = () => {
    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
        })
    }, [])

    const Routing = () => {
        const map = useMap()
        useEffect(() => {
            if (!map) return
            const routingControl = L?.Routing?.control({
                waypoints: [
                    L.latLng(51.50066799635608, -0.1245881319463031),
                    L.latLng(51.492639420416744, -0.11664879336182449),
                    L.latLng(51.51266799635608, -0.1254881319463031),
                    L.latLng(51.50066788635608, -0.1245881319223031),
                ],
            }).addTo(map)

            return () => map?.removeControl(routingControl)
        }, [map])
        return null
    }

    return (
        <div className="trip">
            <div className="hero">
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.mapbox.com/styles/v1/gujinn/cl52fbd3k001314ruwddb6ymv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ3VqaW5uIiwiYSI6ImNrbmlvdWk0dzNxa3QydW54Z2Y1NzBodmQifQ.ihLWmVZjoVWj7BgbQAZjLA"
                    />
                    <Routing />
                </MapContainer>
            </div>
            <div className="itinerary">
                <div className="points">
                    <h1>Récapitulatif de votre voyage à Londres </h1>
                    <div className="activity">
                        <div className="card">
                            <img src="https://resize.marianne.net/r/770,462/img/var/LQ4063680C/501084/080_HL_ANOWAK_1246515.jpg"></img>
                            <div className="description">
                                <span>Balade au bord de merde</span>
                                <span>zofneznefoeznfoeznfjoeznfeyfezbdhuezvdezvfgezvfuezgfvezgduze fezgvufevuzfgvuezfvuezufezvuf</span>
                            </div>
                        </div>
                        <div className="card">
                            <img src="https://resize.marianne.net/r/770,462/img/var/LQ4063680C/501084/080_HL_ANOWAK_1246515.jpg"></img>
                            <div className="description">
                                <span>Balade au bord de merde</span>
                                <span>zofneznefoeznfoeznfjoeznfeyfezbdhuezvdezvfgezvfuezgfvezgduze fezgvufevuzfgvuezfvuezufezvuf</span>
                            </div>
                        </div>
                        <div className="card">
                            <img src="https://resize.marianne.net/r/770,462/img/var/LQ4063680C/501084/080_HL_ANOWAK_1246515.jpg"></img>
                            <div className="description">
                                <span>Balade au bord de merde</span>
                                <span>zofneznefoeznfoeznfjoeznfeyfezbdhuezvdezvfgezvfuezgfvezgduze fezgvufevuzfgvuezfvuezufezvuf</span>
                            </div>
                        </div>
                        <div className="card">
                            <img src="https://resize.marianne.net/r/770,462/img/var/LQ4063680C/501084/080_HL_ANOWAK_1246515.jpg"></img>
                            <div className="description">
                                <span>Balade au bord de merde</span>
                                <span>zofneznefoeznfoeznfjoeznfeyfezbdhuezvdezvfgezvfuezgfvezgduze fezgvufevuzfgvuezfvuezufezvuf</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trip
