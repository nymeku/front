import "./trip.scss";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

const Trip = () => {
  const [recap, setR] = useState([
    {
      selected: true,
      title: "Hôtel amour",
      description:
        "Proche de la Promenade des Anglais, le nouvel hôtel Amour de Nice est un havre de paix en plein quartier des Orangers. Dans des tons roses, bleus ou crème, les chambres vous invitent au repos et à la relaxation. Besoin de vacances, pour un week-end ou bien un séjour en famille.",
      addresse: "",
      picture:
        "https://nice.love-spots.com/wp-content/uploads/sites/2/2020/01/Hotel-Amour-Nice_Love-spots_12.jpg",
      coordinates: [43.69752036838064, 7.2553126538482235],
    },
    {
      selected: true,
      title: "Casa Leya",
      description:
        "La trattoria Casa Leya est un restaurant italien authentique situé dans le Vieux Nice. C’est un lieu de vie et de partage où règnent la convivialité et la gourmandise. C’est un restaurant italien familial, où la simplicité est au rendez-vous. La gastronomie italienne s’offre à vous dans un cadre chaleureux, à la fois moderne et traditionnel.",
      addresse: "",
      picture:
        "https://static.flashmatin.com/uploads/flashmatin_images/fcf937-1535973492.jpg",
      coordinates: [43.69572250088911, 7.2737056250122585],
    },
    {
      selected: true,
      title: "Le Bateleur",
      description:
        "Le Bateleur est un bar chaleureux et confortable situé au cœur de la vieille ville de Nice sur le Cours Saleya, servant des bières crafts et artisanales des 4 coins du monde sur place ou à emporter, une mixologie de cocktails magiques, d’excellents vins et une excellente cuisine toute la journée.",
      addresse: "",
      picture:
        "https://media-cdn.tripadvisor.com/media/photo-s/12/1f/02/0f/l-interieur.jpg",
      coordinates: [43.69546178678984, 7.275844098027785],
    },
    {
      selected: true,
      title: "Aéroport de Nice",
      description: "Vol prévu à 12h30 le mardi 6 Juillet 2022",
      addresse: "",
      picture:
        "https://lh5.googleusercontent.com/p/AF1QipN8dOBlvDRYuGdfbEQV7SUjD2vJanxiwNtDIDE=w408-h321-k-no",
      coordinates: [43.659939638450986, 7.214842855947973],
    },
  ]);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  const Routing = () => {
    const map = useMap();
    useEffect(() => {
      if (!map) return;
      const arr = [];
      recap.map((x) => x.selected && arr.push(L.latLng(x.coordinates)));
      const routingControl = L?.Routing?.control({
        waypoints: arr,
      }).addTo(map);

      return () => map?.removeControl(routingControl);
    }, [map]);
    return null;
  };

  const setSelection = (selection, index) => {
    setR(
      [...recap].map((x, i) => {
        if (index == i)
          return {
            ...x,
            selected: !x.selected,
          };
        else return x;
      })
    );
  };
  console.log(recap);
  return (
    <div className="trip">
      <div className="hero">
        <MapContainer
          center={recap[0].coordinates}
          zoom={13}
          scrollWheelZoom={false}
        >
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
            {recap.map((x, i) => (
              <div
                className={"card " + (recap[i].selected && "selected")}
                onClick={() => setSelection(x, i)}
              >
                <img src={x.picture}></img>
                <div className="description">
                  <span>{x.title}</span>
                  <span>{x.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
