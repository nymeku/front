import React from "react"
import { randomChoose } from "../../helpers/array"
import Button from "../button"
import "./home-footer.scss"

const gifs = ["/img/chika.gif", "/img/nyan.gif", "/img/homer.gif", "/img/dicaprio.gif", "/img/relax.gif"]

/* It's a React component that scrolls the page to the bottom when the user scrolls to the bottom of
the page. */
const HomeFooter: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null)
    const observer = React.useRef<IntersectionObserver | null>(null)
    const timeout = React.useRef<number | null>(null)
    const [outbounds, setO] = React.useState<boolean>(false)
    const isTouching = React.useRef<boolean>(false)

    /* It's a React component that scrolls the page to the bottom when the user scrolls to the bottom of
  the page. */
    React.useEffect(() => {
        /* It's a React component that scrolls the page to the bottom when the user scrolls to the bottom
    of
    the page. */
        window.addEventListener("touchstart", () => {
            console.log("touch", true)
            isTouching.current = true
        })
        /* It's a React component that scrolls the page to the bottom when the user scrolls to the bottom
    of
    the page. */
        window.addEventListener("touchend", () => {
            console.log("touch", false)
            isTouching.current = false
        })
    }, [])

    /* It's a React component that scrolls the page to the bottom when the user scrolls to the bottom of
  the page. */
    React.useEffect(() => {
        /* It's a React component that scrolls the page to the bottom when the user scrolls to the bottom of
    the page. */
        if (observer.current) observer.current.disconnect()

        /* It's a React component that scrolls the page to the bottom when the user scrolls to the bottom
    of
    the page. */
        observer.current = new IntersectionObserver(
            ([entry]) => {
                console.log("observe", entry.intersectionRatio)
                const ratio = entry.intersectionRatio !== 0
                if (ratio !== outbounds) {
                    console.log("switching")
                    setO(ratio)
                }
            },
            {
                threshold: 0,
                rootMargin: "0px 0px 0px 0px",
            }
        )

        /* It's a React component that scrolls the page to the bottom when the user scrolls to the bottom of
    the page. */
        observer.current.observe(ref.current!)
    }, [outbounds, setO])

    /* It's a React component that scrolls the page to the bottom when the user scrolls to the bottom of
  the page. */
    React.useEffect(() => {
        console.log("outbounds", outbounds)
        // @ts-ignore
        if (!outbounds) timeout.current &&= clearTimeout(timeout.current) || null
        else {
            // @ts-ignore
            timeout.current &&= clearTimeout(timeout.current) || null
            /**
             * It prevents scrolling for 750ms, then scrolls to the bottom of the page
             */
            const retract = () => {
                /* It prevents scrolling for 750ms, then scrolls to the bottom of the page */
                document.body.classList.add("block-scroll")
                /* It prevents scrolling for 750ms, then scrolls to the bottom of the page */
                document.body.classList.remove("block-scroll")
                console.log("retract", document.body.scrollHeight - window.innerHeight - 400 - 10)
                let end = Date.now() + 750
                /* It prevents scrolling for 750ms, then scrolls to the bottom of the page */
                window.addEventListener("scroll", (e) => Date.now() > end || e.preventDefault() || false, { passive: false })
                /* It prevents scrolling for 750ms, then scrolls to the bottom of the page */
                window.addEventListener("wheel", (e) => Date.now() > end || e.preventDefault() || false, { passive: false })
                /* It prevents scrolling for 750ms, then scrolls to the bottom of the page */
                window.addEventListener("touchemove", (e) => Date.now() > end || e.preventDefault() || false, { passive: false })
                /* It prevents scrolling for 750ms, then scrolls to the bottom of the page */
                window.addEventListener("touchstart", (e) => Date.now() > end || e.preventDefault() || false, { passive: false })
                /* It scrolls to the bottom of the page. */
                window.scrollTo({
                    top: document.body.scrollHeight - window.innerHeight - 400 - 120 /* 120px for safety */,
                    behavior: "smooth",
                })
            }
            /* It prevents scrolling for 750ms, then scrolls to the bottom of the page */
            if (isTouching.current) {
                /* It prevents scrolling for 750ms, then scrolls to the bottom of the page */
                window.addEventListener("touchend", retract, { once: true })
                /* It's a React component that scrolls the page to the bottom when the user scrolls to the bottom of
        the page. */
                return () => window.removeEventListener("touchend", retract)
            } else {
                timeout.current = setTimeout(retract, 100) as unknown as number
                const yo = (e: WheelEvent) => {
                    console.log("scroll ")
                    clearTimeout(timeout.current!)
                    timeout.current = setTimeout(() => {
                        retract()
                    }, 500) as unknown as number
                }
                console.log("added")
                window.addEventListener("wheel", yo, { passive: false })
                return () => {
                    window.removeEventListener("wheel", yo)
                    console.log("removed")
                }
            }
        }
    }, [outbounds])
    return (
        <footer>
            {gifs.map((i) => (
                <link key={i} as="image" rel="preload" href={i} />
            ))}
            <div className="scie">
                {Array.from({ length: 10 }, (_, i) => i).map((a) => (
                    <div />
                ))}
            </div>
            <h2>Pas encore décidé&nbsp;? Et si vous essayiez Bangkok&nbsp;?</h2>
            <Button to="" text="Let's Go" type="inverted" />
            <div className="elastic" ref={ref} style={{ backgroundImage: `url("${randomChoose(gifs)}")` }} />
        </footer>
    )
}

export default HomeFooter
