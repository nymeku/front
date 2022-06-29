import React from "react"
import "./switch.scss"

type SwitchProps = {
    value: boolean
    onChange: (a: boolean) => void
}
const Switch: React.FC<SwitchProps> = ({ value = false, onChange }) => {
    return (
        <div className={"switch " + (value ? "on" : "off")} onClick={() => onChange(!value)}>
            <div />
        </div>
    )
}

export default Switch
