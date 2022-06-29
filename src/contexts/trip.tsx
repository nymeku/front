import React, { createContext, useContext, useEffect, useState } from "react"
import { Item } from "../types"

type TripContextType = {
    state: {
        items: Item[]
        [key: string]: any
    }
    setState: React.Dispatch<React.SetStateAction<TripContextType["state"]>>
}
const defaultTripContext: TripContextType = {
    state: {
        items: [],
    },
    setState: () => void 0,
}
const TripContext = createContext<TripContextType>(defaultTripContext)

type ProviderProps = {
    children: React.ReactNode
}

export const TripProvider: React.FC<ProviderProps> = ({ children }) => {
    const [state, setState] = useState<TripContextType["state"]>(JSON.parse(localStorage.getItem("trip") || "null") || defaultTripContext.state)
    useEffect(() => {
        localStorage.setItem("trip", JSON.stringify(state))
    }, [state])
    return <TripContext.Provider value={{ state, setState }}>{children}</TripContext.Provider>
}
export const useTripContext = (): [TripContextType["state"], TripContextType["setState"]] => {
    const context = useContext(TripContext)
    return [context.state, context.setState]
}

export default TripContext
