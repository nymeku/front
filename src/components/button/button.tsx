import React from "react"
import { Link } from "react-router-dom"
import "./button.scss"

/**
 * ButtonProps is an object with a text property that is a string, a to property that is a string, and
 * an optional type property that is either "normal" or "inverted".
 * @property {string} text - The text that will be displayed on the button.
 * @property {string} to - The path to navigate to when the button is clicked.
 * @property {"normal" | "inverted"} type - The type of button. This is optional, and the default value
 * is "normal".
 */
type ButtonProps = {
    text: string
    to: string
    type?: "normal" | "inverted"
}

/**
 * The Button component is a React component that takes in a text, to, and type prop and returns a Link
 * component with the text prop as the text and the to prop as the to prop
 * @param  - React.FC<ButtonProps> - This is the type of the component. It's a React component that
 * takes a generic type, which is the type of the props.
 * @returns A Link component with a className of button and the type passed in.
 */
const Button: React.FC<ButtonProps> = ({ text, to, type = "normal" }) => {
    return (
        <Link to={to} className={"button " + type}>
            {text}
        </Link>
    )
}

export default Button
