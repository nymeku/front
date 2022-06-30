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
							<img src={a} alt="" />
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
						Suspendisse ac tristique sapien. Vestibulum nisi orci, finibus in massa vel,
						porta imperdiet dolor. Duis sit amet orci eget arcu ultrices egestas pretium
						nec massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed
						nec lectus massa. Quisque arcu quam, porta vel tincidunt et, volutpat ut
						massa.
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
						Nunc dapibus nunc lorem, sed rhoncus massa tincidunt eget. Integer
						ullamcorper felis at odio mattis, id mattis dolor vulputate. Duis sed est
						eget tellus ultricies finibus luctus id tellus. Phasellus urna enim, luctus
						nec felis in, pulvinar eleifend eros. Duis rhoncus risus vel turpis mollis,
						non lobortis ipsum aliquam.
					</p>
					<Button to="" text="Choisir une activité" />
				</div>
			</section>
			<section className="sect-2 left">
				<div className="text">
					<h2>Vous pensez avoir tout vu&nbsp;? On en doute fort&nbsp;!</h2>
					<p>
						Fusce hendrerit, nibh quis aliquet sollicitudin, arcu elit pretium magna, in
						varius metus libero nec magna. Suspendisse non ante a mi bibendum ornare a
						non augue.
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
					Fusce hendrerit, nibh quis aliquet sollicitudin, arcu elit pretium magna, in
					varius metus libero nec magna. Suspendisse non ante a mi bibendum ornare a non
					augue.
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
