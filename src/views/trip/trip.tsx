import "./trip.scss";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
// @ts-ignore
import L from "leaflet";
import { useEffect, useState, useRef, useCallback } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Item } from "../../types";
import { API_URL } from "../../constantes";
import { getLocation } from "../../services/location-service";
import { linkFromReference } from "../../services/image-service";

type AugmentedItem = Item & {
  selected: boolean;
};

function uppercaseFirstLtter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function parseType(type: string) {
  const chunks = type.split("_");
  return chunks.map(uppercaseFirstLtter).join(" ");
}

async function fetchSelection(
  id: string
): Promise<{ data: AugmentedItem[]; config: Config }> {
  const response = await fetch(`${API_URL}/selection?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const items = (await response.json()).result.selection as any[];

  if (!items?.length) {
    throw new Error("No items");
  }
  return { data: items.slice(1) as AugmentedItem[], config: items[0] };
}

type Config = {
  destination: string;
  from: number;
  to: number;
};

function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function makePrintable(config: Config, selection: AugmentedItem[]) {
  const data: string = selection
    .map((item) => {
      return `<div style="display:flex;flex-direction: column; border: 1px solid lightgray;width:300px;border-radius: 8px;overflow:hidden;"><img src="${
        item.photos?.length
          ? item.isGoogle !== false
            ? linkFromReference(item.photos[0], 400)
            : item.photos[0]
          : ""
      }" alt="" style="width:300px;height:200px;"/><div style="display:grid;grid-template-columns: auto 1fr;grid-auto-rows: 1fr; padding: 16px 20px;column-gap: 20px;"><span style="color: darkgray;font-size:0.8rem">Nom</span><span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${
        item.name
      }</span><span style="color: darkgray;font-size:0.8rem">Categorie</span><span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${parseType(
        item.types[0]
      )}</span><span style="color: darkgray;font-size:0.8rem">Adresse</span> <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${
        item.address
      }</span></div></div>`;
    })
    .join("<br/>");
  return `data:text/html;charset=utf8,<html><head><style>@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");*{font-family: "Nunito Sans", sans-serif;}</style><title>Votre provhain voyage</title></head><body><h1>Votre prochain voyage</h1><div>Destination: ${
    config.destination
  }<br/>Dates: Du ${new Date(config.from).toLocaleDateString()} au ${new Date(
    config.to
  ).toLocaleDateString()}</div><br/><div style="display: flex; flex-wrap:wrap; gap: 24px;">${data}</div>
  <p><a href="${
    window.location.href
  }">Voir en ligne</a><br/> ou utiliser ce lien : ${
    window.location.href
  }<br/>Généré le ${new Date().toLocaleString()}</p><script>window.onload = ()=>print();</script></body></html>`;
}

type RoutingProps = {
  recap?: AugmentedItem[]
}
const Routing: React.FC<RoutingProps> = ({ recap }) =>{
  const map = useMap();
  useEffect(() => {
    if (!map || !recap?.length) return;

    const arr: any[] = recap
      .filter((x) => x.location && x.selected)
      .map((x) => L.latLng([x.location.lat, x.location.lng]));

    if (arr.length) {
      const routingControl = L?.Routing?.control({
        waypoints: arr,
      }).addTo(map);

      return () => map?.removeControl(routingControl);
    }
  }, [recap, map]);
  return null
}

const Trip = () => {
  const [recap, setR] = useState<AugmentedItem[] | null>(null);
  const [config, setConfig] = useState<Config | null>(null);
  const { id } = useParams();
  const isFetching = useRef<boolean>(false);

  useEffect(() => {
    if (!id) {
      setR([]);
    } else {
      isFetching.current = true;
      fetchSelection(id)
        .then(async ({ data, config }) => {
          for (const x of data) {
            x.selected = true;
            if (!x.location) {
              x.location = await getLocation(x.address);
            }
            await wait(1_100);
          }
          setR(data);
          setConfig(config);
        })
        .catch((err) => {
          console.log(err);
          setR([]);
        })
        .finally(() => {
          isFetching.current = false;
        });
    }
  }, [id]);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  

  if (!id) return <Navigate to="/" />;
  if (!recap) return <>Loading</>;
  if (!recap?.length) return <Navigate to="/" />;

  console.log(recap);

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
          center={[
            recap?.[0]?.location?.lat || 1,
            recap?.[0]?.location?.lng || 1,
          ]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            // @ts-ignore
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/gujinn/cl52fbd3k001314ruwddb6ymv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ3VqaW5uIiwiYSI6ImNrbmlvdWk0dzNxa3QydW54Z2Y1NzBodmQifQ.ihLWmVZjoVWj7BgbQAZjLA"
          />
          <Routing recap={recap} />
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
                <img
                  src={
                    x.photos?.length
                      ? x.isGoogle !== false
                        ? linkFromReference(x.photos[0], 400)
                        : x.photos[0]
                      : ""
                  }
                ></img>
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
      <button
        style={{
          width: "calc(100% - 2 * var(--margin))",
          height: 64,
          backgroundColor: "var(--blue-joy)",
          marginTop: 20,
          marginBottom: 120,
          marginInline: "var(--margin)",
          borderRadius: 15,
          color: "white",
          fontSize: 28,
        }}
        onClick={() => window.open(makePrintable(config!, recap), "_blank")}
      >
        Enregistrez votre planning
      </button>
    </div>
  );
};

export default Trip;
