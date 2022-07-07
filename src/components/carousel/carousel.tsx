import React from "react"
import { linkFromReference } from "../../services/image-service"
import { Item } from "../../types"
import { FaStar, FaPlus, FaMinus } from "react-icons/fa"
import "./carousel.scss"
import { useTripContext } from "../../contexts/trip"

type CardProps = Item
const MAX_ITEMS_COUNT = 30
/* A React component that takes in a CardProps object and returns a div. */
const Card: React.FC<CardProps> = function ({ reference, photos, name, address, rating, isGoogle, link }) {
    const item = arguments[0]
    const [Trip, setTrip] = useTripContext()
    const [open, setO] = React.useState(true)
    const card = React.useRef<HTMLDivElement>(null)
    const [active, setA] = React.useState(true)

    /* Using the IntersectionObserver API to determine if the card is visible. */
    React.useEffect(() => {
      if(document.body.getBoundingClientRect().width < 450) return
      if (!card.current) return
        /* Using the IntersectionObserver API to determine if the card is visible. */
        const obs = new IntersectionObserver(
            function ([{ intersectionRatio }]) {
                const visible = intersectionRatio >= 0.8
                if (active !== visible) setA(visible)
            },
            { threshold: 0.8, root: card.current.parentElement }
        )
        /* Observing the card. */
        obs.observe(card.current)
        return () => obs.disconnect()
    }, [active])

    /* Checking if the item is already in the trip. */
    const added = !!Trip.items.find((a) => a.reference === reference)

    return (
        <div
            className={"card " + (active ? "" : "inactive")}
            key={reference}
            ref={card}
            onClick={() => {
                active ||
                    card.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                    })
            }}
        >
            <div
                className={"add " + (added ? "remove" : "")}
                /* A function that is called when the mouse is pressed down on the add button. It checks if the
        card is active and if it is, it sets the trip to a new trip. The new trip is a copy of the
        old trip with the items array copied. It then finds the index of the item in the items
        array. If the item is not in the array and the array is less than 5 items long, it adds the
        item to the array. If the item is in the array, it filters the array to remove the item. */
                onMouseDown={() => {
                    active &&
                        setTrip((a) => {
                            console.count("click")
                            let b = { ...a }
                            b.items = [...a.items]
                            console.log(b.items)
                            let i = b.items.findIndex((c) => c.reference === reference)
                            console.log(i, reference)
                            if (i === -1 && Trip.items.length < MAX_ITEMS_COUNT) b.items.push(item)
                            else if (i !== -1) b.items = b.items.filter((c) => c.reference !== reference)
                            console.log(b.items)
                            return b
                        })
                }}
            >
                {added ? <FaMinus /> : <FaPlus />}
            </div>
            <img src={photos?.length ? isGoogle !== false ? linkFromReference(photos[0], 400) : photos[0] : ""} alt={name} />
            <h4>{name}</h4>
            <h6>{address}</h6>
            <div className="bottom">
                {link ? <button onClick={() => window.open(link,"_blank")}>En savoir plus</button> : <span style={{width:'100%',flexShrink:1}}></span>}
                <FaStar />
                <span>{rating}</span>
            </div>
        </div>
    )
}

/**
 * It takes in an array of items and a title and returns a section with a title and a carousel of
 * cards.
 * @param  - React.FC<{ data: Item[]; title: string }>
 * @returns A React component that takes in an array of data and a title and returns a section with a
 * title and a div with a class of carousel-content and noscrollbar. The div contains a Card component
 * for each item in the data array.
 */
const Carousel: React.FC<{ data: Item[]; title: string }> = ({ data, title }) => {
    return (
        <section className="carousel">
            <h3>{title}</h3>
            <div className="carousel-content noscrollbar">
                {data.map((a) => (
                    <Card {...a} />
                ))}
            </div>
        </section>
    )
}

export default Carousel
