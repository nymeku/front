import React from "react"
import "./App.css"
import Home from "./views/home"
import Choose from "./views/choose"
import { Routes, Route, BrowserRouter, useSearchParams } from "react-router-dom"
import Switch from "./components/switch"
import { TripProvider } from "./contexts/trip"
import App from "./views/App/App"

/**
 * It renders a div that can be moved around the screen, and when activated, outlines all elements on
 * the page
 */
const DesignGuidelines = () => {
    const ref = React.useRef<HTMLDivElement>(null)
    const [params] = useSearchParams()
    const [movable, setM] = React.useState(false)
    const [activated, setA] = React.useState(true)
    /* Setting the initial position of the guidelines div. */
    const [position, setP] = React.useState(
        JSON.parse(localStorage.guidelines ?? null) || {
            top: 20,
            left: window.screen.width - 200,
        }
    )

    /* Saving the position of the guidelines div to local storage. */
    React.useEffect(() => {
        localStorage.setItem("guidelines", JSON.stringify(position))
    }, [position])

    /* Adding and removing event listeners. */
    React.useEffect(() => {
        /**
         * Move is a function that takes an event as an argument and returns a new object with the top and
         * left properties set to the mouse's position.
         * @param {MouseEvent} e - MouseEvent - this is the event object that is passed to the function.
         */
        function move(e: MouseEvent) {
            setP({
                top: e.clientY - 10,
                left: e.clientX - 10,
            })
        }
        /* Adding an event listener to the window object. */
        if (movable) window.addEventListener("mousemove", move)
        /* This is a check to see if the ref is null. If it is, then it returns a function that removes the
    event listener. */
        if (!ref.current) {
            if (movable) return () => window.removeEventListener("mousemove", move)
            else return
        }
        /* Adding an event listener to the div that is being moved around the screen. */
        ref.current.addEventListener(
            "mouseup",
            () => {
                setM(false)
            },
            { once: true }
        )
        /* Adding an event listener to the div that is being moved around the screen. */
        ref.current.addEventListener(
            "mousedown",
            () => {
                setM(true)
            },
            { once: true }
        )
        /* Checking to see if the div is movable. If it is, then it returns a function that removes the event
    listener. */
        if (movable) return () => window.removeEventListener("mousemove", move)
    }, [movable])

    /* Checking to see if the url has the query parameter "guidelines". If it does, then it
  renders the guidelines div. */
    if (params.has("guidelines"))
        return (
            <>
                <div
                    ref={ref}
                    className="guidelines"
                    style={{
                        position: "fixed",
                        ...position,
                        zIndex: 1_000_000,
                        backgroundColor: "white",
                        padding: 8,
                        borderRadius: 5,
                        boxShadow: "0px 0px 5px rgba(0,0,0,.5)",
                    }}
                >
                    Guidelines <Switch value={activated} onChange={setA} />
                </div>
                {activated && <style>{"*:not(.guidelines, .guidelines *) { outline: 1px solid red; }"}</style>}
            </>
        )
    else return <></>
}

/* A function that returns a react component. */
const Application: React.FC = () => {
    return (
        <BrowserRouter>
            <DesignGuidelines />
            <TripProvider>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/app/:session" element={<App />} />
                    <Route path="/destination/:city" element={<Choose type="destination" />} />
                </Routes>
            </TripProvider>
        </BrowserRouter>
    )
}

export default Application
