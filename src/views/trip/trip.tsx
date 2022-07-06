import "./trip.scss";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
// @ts-ignore
import L from "leaflet";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Item } from "../../types";
import { API_URL } from "../../constantes";
import { getLocation } from "../../services/location-service";

type AugmentedItem = Item & {
  selected: boolean;
}

const TEST_DATA: AugmentedItem[] = [
  {
    selected: true,
    name: "Hôtel amour",
    address: "alabamaj beojnb j  hskb kj kj hjk k jikj jb k",
    photos: [
      "https://nice.love-spots.com/wp-content/uploads/sites/2/2020/01/Hotel-Amour-Nice_Love-spots_12.jpg",
    ],
    rating: .4,
    reference: "",
    totalRatings: 1,
    types: ["hotel"],
    location: {
      lat: 43.69752036838064,
      lng: 7.2553126538482235
    },
  },
  {
    selected: true,
    name: "Hôtel amour",
    address: "alabamaj beojnb j  hskb kj kj hjk k jikj jb k",
    photos: [
      "https://nice.love-spots.com/wp-content/uploads/sites/2/2020/01/Hotel-Amour-Nice_Love-spots_12.jpg",
    ],
    rating: .4,
    reference: "",
    totalRatings: 1,
    types: ["hotel"],
    location: {
      lat: 43.69752036838064,
      lng: 7.2553126538482235
    },
  },
  {
    selected: true,
    name: "Hôtel amour",
    address: "alabamaj beojnb j  hskb kj kj hjk k jikj jb k",
    photos: [
      "https://nice.love-spots.com/wp-content/uploads/sites/2/2020/01/Hotel-Amour-Nice_Love-spots_12.jpg",
    ],
    rating: .4,
    reference: "",
    totalRatings: 1,
    types: ["hotel"],
    location: {
      lat: 43.69752036838064,
      lng: 7.2553126538482235
    },
  },
  {
    selected: true,
    name: "Hôtel amour",
    address: "alabamaj beojnb j  hskb kj kj hjk k jikj jb k",
    photos: [
      "https://nice.love-spots.com/wp-content/uploads/sites/2/2020/01/Hotel-Amour-Nice_Love-spots_12.jpg",
    ],
    rating: .4,
    reference: "",
    totalRatings: 1,
    types: ["hotel"],
    location: {
      lat: 43.69752036838064,
      lng: 7.2553126538482235
    },
  },
  {
    selected: true,
    name: "Hôtel amour",
    address: "alabamaj beojnb j  hskb kj kj hjk k jikj jb k",
    photos: [
      "https://nice.love-spots.com/wp-content/uploads/sites/2/2020/01/Hotel-Amour-Nice_Love-spots_12.jpg",
    ],
    rating: .4,
    reference: "",
    totalRatings: 1,
    types: ["hotel"],
    location: {
      lat: 43.69752036838064,
      lng: 7.2553126538482235
    },
  },
  {
    selected: true,
    name: "Hôtel amour",
    address: "alabamaj beojnb j  hskb kj kj hjk k jikj jb k",
    photos: [
      "https://nice.love-spots.com/wp-content/uploads/sites/2/2020/01/Hotel-Amour-Nice_Love-spots_12.jpg",
    ],
    rating: .4,
    reference: "",
    totalRatings: 1,
    types: ["hotel"],
    location: {
      lat: 43.69752036838064,
      lng: 7.2553126538482235
    },
  },
  {
    selected: true,
    name: "Hôtel amour",
    address: "alabamaj beojnb j  hskb kj kj hjk k jikj jb k",
    photos: [
      "https://nice.love-spots.com/wp-content/uploads/sites/2/2020/01/Hotel-Amour-Nice_Love-spots_12.jpg",
    ],
    rating: .4,
    reference: "",
    totalRatings: 1,
    types: ["hotel"],
    location: {
      lat: 43.69752036838064,
      lng: 7.2553126538482235
    },
  },
  {
    selected: true,
    name: "Casa Leya",
    address: "alabamaj beojnb j  hskb kj kj hjk k jikj jb k",
    photos: [
      "https://static.flashmatin.com/uploads/flashmatin_images/fcf937-1535973492.jpg",
    ],
    rating: .4,
    reference: "",
    totalRatings: 1,
    types: ["hotel"],
    location: {
      lat: 43.69572250088911,
      lng: 7.2737056250122585
    },
  },
  {
    selected: true,
    name: "Le Bateleur",
    address: "alabamaj beojnb j  hskb kj kj hjk k jikj jb k",
    photos: [
      "https://media-cdn.tripadvisor.com/media/photo-s/12/1f/02/0f/l-interieur.jpg",
    ],
    rating: .4,
    reference: "",
    totalRatings: 1,
    types: ["hotel"],
    location: {
      lat: 43.69546178678984,
      lng: 7.275844098027785
    }
  },
  {
    selected: true,
    name: "Aéroport de Nice",
    address: "alabamaj beojnb j  hskb kj kj hjk k jikj jb k",
    photos: [
      "https://lh5.googleusercontent.com/p/AF1QipN8dOBlvDRYuGdfbEQV7SUjD2vJanxiwNtDIDE=w408-h321-k-no",
    ],
    rating: .4,
    reference: "",
    totalRatings: 1,
    types: ["hotel"],
    location: {
      lat: 43.659939638450986,
      lng: 7.214842855947973
    },
  },
]

function uppercaseFirstLtter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
function parseType(type: string) {
  const chunks = type.split("_")
  return chunks.map(uppercaseFirstLtter).join(" ")
}

async function fetchSelection(id: string): Promise<{ data: AugmentedItem[], config: Config }> {
  // return {
  //   data: TEST_DATA,
  //   config: {
  //     destination: "Milan",
  //     from: Date.now(),
  //     to: Date.now() + 1000 * 60 * 60 * 24 * 7,
  //   }
  // }
  const response = await fetch(`${API_URL}/selection?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }
  const items = (await response.json()).result.selection as any[];

  if (!items?.length) {
    throw new Error("No items")
  }
  return { data: items.slice(1) as AugmentedItem[], config: items[0] }

}

type Config = {
  destination: string;
  from: number;
  to: number;
}

function makePrintable(config: Config, selection: AugmentedItem[]) {
  const data: string = selection.map(item => {
    return `<div style="display:flex;flex-direction: column; border: 1px solid lightgray;width:300px;border-radius: 8px;overflow:hidden;"><img src="${item.photos?.[0]}" alt="" style="width:300px;height:200px;"/><div style="display:grid;grid-template-columns: auto 1fr;grid-auto-rows: 1fr; padding: 16px 20px;column-gap: 20px;"><span style="color: darkgray;font-size:0.8rem">Nom</span><span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${item.name}</span><span style="color: darkgray;font-size:0.8rem">Categorie</span><span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${parseType(item.types[0])}</span><span style="color: darkgray;font-size:0.8rem">Adresse</span> <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${item.address}</span></div></div>`
  }).join("<br/>")
  return `data:text/html;charset=utf8,<html><head><style>@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");*{font-family: "Nunito Sans", sans-serif;}</style><title>Votre provhain voyage</title></head><body><h1>Votre prochain voyage</h1><div>Destination: ${config.destination}<br/>Dates: Du ${new Date(config.from).toLocaleDateString()} au ${new Date(config.to).toLocaleDateString()}</div><br/><div style="display: flex; flex-wrap:wrap; gap: 24px;">${data}</div>
  <p><a href="${window.location.href}">Voir en ligne</a><br/> ou utiliser ce lien : ${window.location.href}<br/>Généré le ${new Date().toLocaleString()}</p><script>window.onload = ()=>print();</script></body></html>`
}
const Trip = () => {
  const [recap, setR] = useState<AugmentedItem[] | null>(null);
  const [config, setConfig] = useState<Config | null>(null);
  const { id } = useParams()

  useEffect(() => {
    if (!id) {
      setR([])
    } else {
      fetchSelection(id)
        .then(({ data, config }) => {
          setR(data)
          setConfig(config)
        })
        .catch(err => {
          console.log(err)
          setR([])
        })
    }
  }, [id])

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  if (!id) return <Navigate to="/" />
  if (!recap) return <>Loading</>
  if (!recap?.length) return <Navigate to="/" />

  const Routing = () => {
    const map = useMap();
    useEffect(() => {
      if (!map) return;
      const arr: any[] = [];
      console.log(recap)
      recap.map(async (x) => {
        if (!x.location) {
          let loc = await getLocation(x.address)
          arr.push(L.latLng([loc.lat, loc.lng]))
        }
        else arr.push(L.latLng([x.location.lat, x.location.lng]))
      });
      console.log('ARR', arr)
      const routingControl = L?.Routing?.control({
        waypoints: arr,
      }).addTo(map);

      return () => map?.removeControl(routingControl);

    }, []);
    return null;
  };

  const setSelection = (index: number) => {
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

  return (
    <div className="trip">
      <div className="hero">
        <MapContainer
          // @ts-ignore
          center={[recap?.[0]?.location?.lat || 1, recap?.[0]?.location?.lng || 1]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            // @ts-ignore
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/gujinn/cl52fbd3k001314ruwddb6ymv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ3VqaW5uIiwiYSI6ImNrbmlvdWk0dzNxa3QydW54Z2Y1NzBodmQifQ.ihLWmVZjoVWj7BgbQAZjLA"
          />
          <Routing />
        </MapContainer>
      </div>
      <div className="itinerary">
        <div className="points">
          <h1>Récapitulatif de votre voyage à {config!.destination} </h1>
          <div className="activity">
            {recap.map((x, i) => (
              <div
                key={x.reference + i}
                className={"card " + (recap[i].selected && "selected")}
                onClick={() => setSelection(i)}
              >
                <img src={x.photos?.[0]}></img>
                <div className="description">
                  <span>{parseType(x.types[0])}</span>
                  <span>{x.name}</span>
                  <span>{x.address}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h1>Prêt à partir ?</h1>
      <button style={{
        width: "calc(100% - 2 * var(--margin))",
        height: 64,
        backgroundColor: "var(--blue-joy)",
        marginTop: 20,
        marginBottom: 120,
        marginInline: "var(--margin)",
        borderRadius: 15,
        color: "white",
        fontSize: 28
      }} onClick={() => window.open(makePrintable(config!, recap), "_blank")}>Enregistez votre planning</button>
    </div>
  );
};

export default Trip;
