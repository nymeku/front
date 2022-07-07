import React from "react"
import "./home.scss"
import { MdFlightTakeoff } from "react-icons/md"
import { GiMaracas } from "react-icons/gi"
import Searchbar from "../../components/searchbar"
import Button from "../../components/button"
import { Link, useNavigate } from "react-router-dom"
import HomeFooter from "../../components/home-footer"
import overrideScroll from "../../contexts/react-scroll"

const images: string[] = [
	"/img/hero-4.jpg",
	"/img/hero-3.jpg",
	"/img/hero-2.jpg",
	"/img/hero-1.jpg",
]
const Home: React.FC = () => {
	const navigate = useNavigate()
	React.useEffect(() => {
		return overrideScroll()
	}, [])
	return (
		<main className="home">
			<header>
				<img className="background" src="/img/header.png" alt="" />
				<img className="logo" src="https://timenjoy.fr/img/logo-dark.svg" alt="" />
				<nav>
					<Link to="/enjoy">Evenements</Link>
					<Link to="/sleep">Hotels</Link>
					<Link to="/travel">Transports</Link>
					<Link to="/travel">Restaurants</Link>
					<Link to="/travel">Bars</Link>
					<Link to="/auth/signin">Connexion</Link>
				</nav>
			</header>
			<section className="hero">
				<div className="background">
					{images.map((a) => (
						<div>
							<img src={a} alt={a} />
						</div>
					))}
				</div>
				<div className="foreground">
					<h1 className="_noscrollbar">Vivez de nouvelles expériences</h1>
					<h3>
						Planifiez votre prochain voyage et profitez pleinement de votre destination
					</h3>
				</div>
				<Searchbar
					title="Je veux aller à"
					placeholder="Milan"
					submit={(city) => navigate("/destination/" + city)}
				/>
			</section>
			<section className="sect-2 left">
				<div className="text">
					<h2>Des milliers de destinations à portée de main.</h2>
					<p>
					Une envie de voyage ? Trip n'fun vous accompagne à la découverte des meilleurs événements et activités dans toutes les villes de France.
Découvrez nos villes tendances du moment.
					</p>
					<Button to="" text="Choisir une destination" />
				</div>
				<div className="image-block japan">
					<img src="/img/japan-2.jpg" alt="" />
					<img src="/img/japan-3.jpg" alt="" />
					<img src="/img/japan-1.jpg" alt="" />
					<Link to="">
						Le Japon vous attend <MdFlightTakeoff />
					</Link>
				</div>
			</section>
			<section className="sect-2 right">
				<div className="image-block mexico">
					<img src="/img/mexico-1.jpg" alt="" />
					<img src="/img/mexico-2.jpg" alt="" />
					<img src="/img/mexico-3.jpg" alt="" />
					<Link to="">
						Séjournez au Mexique <GiMaracas />
					</Link>
				</div>
				<div className="text">
					<h2>
						Enivrez-vous des cultures lointaines et découvrez une part de vous-même.
					</h2>
					<p>
					Retrouvez le meilleur des événements, bons plans et des activités de votre ville en un instant.
					</p>
					<Button to="" text="Choisir une activité" />
				</div>
			</section>
			<section className="sect-2 left">
				<div className="text">
					<h2>Vous pensez avoir tout vu&nbsp;? On en doute fort&nbsp;!</h2>
					<p>
					Une envie de sortir cette semaine, ce week-end ? Découvrez le meilleur des événements, bons plans et activités à faire près de chez vous.
					</p>
					<Button to="" text="Découvrez ce que vous manquez" />
				</div>
				<div className="image-block food">
					<img src="/img/food-1.jpg" alt="" />
					<img src="/img/food-2.jpg" alt="" />
					<img src="/img/food-3.jpg" alt="" />
				</div>
			</section>
			<section className="sect-3" style={{ backgroundImage: 'url("/img/boat.jpg")' }}>
				<h2>Et si vous partiez dès demain</h2>
				<h2>pour de nouveaux horizons&nbsp;?</h2>
			</section>
			<section className="sect-4">
				<h2>Laissez-vous guider pas-à-pas dans l'organisation de vos vacances.</h2>
				<h4>
					Pas besoin de se prendre la tête. Nous sommes là pour vous accompagner tout au long de votre
					voyage.
				</h4>
				<img src="/img/map.jpg" alt="" />
				<Searchbar
					title="Je veux voir"
					placeholder="le Festival Tomorrowland"
					submit={() => void 0}
				/>
			</section>
			<HomeFooter />
		</main>
	)
}

export default Home
