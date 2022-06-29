import React from "react"
import { useParams } from "react-router-dom"

const Header = () => {
    return (
        <header
            style={{
                width: "100vw",
                height: "calc(2 * var(--row) + 2 * var(--row-gap))",
                background: "blue",
            }}
        >
            Header
        </header>
    )
}
export type AppParams = {
    session: string
}
const App: React.FC = () => {
    const { session } = useParams<AppParams>()
    return (
        <main className="app" style={{ width: "100vw", height: "100vh" }} id={session}>
            <Header />
        </main>
    )
}

export default App
