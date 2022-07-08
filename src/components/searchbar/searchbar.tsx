import React, { useState } from "react"
import "./searchbar.scss"

type SearchBarProps = {
    title: string
    placeholder: string
    submit: (a: string) => void
}
type SearchbarSubmitEvent = React.FormEvent<HTMLFormElement> & {
    target: React.FormEvent<HTMLFormElement>["target"] & {
        0: HTMLInputElement
    }
}

const SearchBar: React.FC<SearchBarProps> = ({ title, placeholder, submit }) => {
    const [filter, setF] = useState()
    function onSubmit(e: SearchbarSubmitEvent) {
        const value = e.target[0].value?.toLowerCase()
        if (!value) return
        submit(e.target[0].value.toLowerCase())
    }
    return (
        <div className="search">
            <form className="search-box" onSubmit={onSubmit}>
                <h6>{title}</h6>
                <input placeholder={placeholder} />
                <button type="submit">Planifier</button>
            </form>
        </div>
    )
}

export default SearchBar
