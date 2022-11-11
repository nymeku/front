import React, { useState } from "react"
import { Link, useNavigate, Navigate, useParams, useSearchParams } from "react-router-dom"
import { discover, DiscoveryResponse } from "../../services/destination-service"
import { linkFromReference } from "../../services/image-service"
import Carousel from "../../components/carousel"
import Footer from "../../components/footer"
import "./choose.scss"
import { Item } from "../../types"
import { useTripContext } from "../../contexts/trip"
import { API_URL } from "../../constantes"

function uppercaseFirstLtter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
function parseType(type: string) {
	const chunks = type.split("_")
	return chunks.map(uppercaseFirstLtter).join(" ")
}
const SmallCard: React.FC<Item> = ({ name, types }) => {
	return (
		<div className="small-card">
			<label>{parseType(types[0])}</label>
			<h4>{name}</h4>
		</div>
	)
}

type ChooseProps = {
	type: "destination" | "event"
}
type Config = {
	destination: string
	from: number
	to: number
}

const citySuggestions = ["Nice", "Paris", "Londres", "Tokyo", "Osaka", "Milan", "Rome", "Berlin", "Shanghai", "Beijing", "Rio de Janeiro"]

async function saveSelection(config: Config, selection: Item[]) {
	const body = JSON.stringify({ selection: [config, ...selection] })

	const response = await fetch(API_URL + "/selection", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	})
	if (!response.ok) {
		throw new Error("Error while saving selection")
	}
	const data = await response.json()
	if (data.status !== "CREATED") {
		throw new Error("Error while saving selection")
	}
	return data.id
}
type SearchParams = {
	from: string
	to: string
}
const Choose: React.FC<ChooseProps> = ({ type }) => {
	const [Trip, setTrip] = useTripContext()
	const { city: cityParams } = useParams()
	const [search] = useSearchParams()
	const from = search.get("from") || Date.now().toString()
	const to = search.get("to") || (Date.now() + 1000 * 60 * 60 * 24 * 7).toString()
	const navigate = useNavigate()
	const [data, setData] = React.useState<DiscoveryResponse | false>()

	React.useEffect(() => {
		if (cityParams)
			discover(cityParams, { from: parseInt(from), to: parseInt(to) })
				.then(setData)
				.then(() => window.scrollTo({ top: 0, behavior: "smooth" }))
				.catch(() => setData(false))
	}, [cityParams])
	React.useEffect(() => {
		if (Trip.items.length)
			setTrip((a) => {
				const b = { ...a }
				b.items = []
				return b
			})
	}, [cityParams])

	if (!cityParams || data === false) return <Navigate to="/" />
	if (data === undefined) return <>Loading</>

	const { city, drink, restaurant, sleep, events } = data

	function onNext() {
		saveSelection({ destination: city.name, from: parseInt(from), to: parseInt(to) }, Trip.items)
			.then((id: string) => navigate("/recap/" + id))
			.catch((err) => {
				console.error(err)
				alert("Error while saving selection")
			})
	}

	return (
		<main className="overview">
			<section className="hero beforeafter">
				<div>
					<img src={linkFromReference(city.photo)} alt={city.name} />
					<h1>{city.name}</h1>
				</div>
			</section>
			<svg height="0" width="0" viewBox="0 0 1 1">
				<defs>
					<clipPath id="overview" clipPathUnits="objectBoundingBox">
						<path d="M0,0 h1 v0.88 a0.02,0.02 0 0 1 -0.01,0.02 L0.01,1 a0.02,0.02 0 0 1 -0.01,-0.02 v-0.98 z" fill="white" stroke="white" />
					</clipPath>
				</defs>
			</svg>
			<section className="introduction">
				<h2>Êtes-vous prêt pour l'aventure ?</h2>
				<p>
					Sed vitae nulla vel justo dignissim venenatis. Sed et mauris sit amet lorem imperdiet vestibulum. Donec tristique lorem a urna iaculis pellentesque. Etiam ac aliquam risus. In
					tempor elit a dapibus aliquet. Nulla enim purus, malesuada id felis a, ullamcorper porttitor nunc. Nulla leo dui, aliquet vitae eleifend in, sagittis nec lorem.
				</p>
			</section>
			<Carousel data={events} title="Activités" />
			<Carousel data={sleep} title="Hotels" />
			<Carousel data={drink} title="Bars" />
			<Carousel data={restaurant} title="Restaurants" />
			<section className="introduction conclusion">
				<h2>Milan ne vous plait pas ? Ouvrez-vous à de nouveaux horizons.</h2>
				<nav>
					{citySuggestions.map((a) => (
						<Link key={a} to={"/destination/" + a}>
							{a}
						</Link>
					))}
				</nav>
			</section>
			<aside>
				<span>Sélectionnez jusqu'à 30 éléments qui vous plaisent.</span>
				<div className="noscrollbar">
					{Trip.items.map((a) => (
						<SmallCard key={a.reference} {...a} />
					))}
				</div>
				<div className={"next " + (Trip.items.length ? "" : "inactive")}>
					<button onClick={onNext}>Suivant</button>
				</div>
			</aside>
			<Footer />
		</main>
	)
}

export default Choose
